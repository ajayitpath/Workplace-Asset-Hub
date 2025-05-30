﻿using Microsoft.Extensions.Configuration;
using System.Data;
using System.Security.Claims;
using WAH.BLL.Mappers.AuthMappers;
using WAH.BLL.Services.Interfaces.AuthInterface;
using WAH.Common.DtoModels.AuthDtos;
using WAH.Common.Helpers;
using WAH.DAL.EntityModels;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services.Implementations.AuthServices
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<UserEntity> _userRepository;
        private readonly IGenericRepository<RoleEntity> _roleRepository;
        private readonly IPasswordHasherService _passwordHasherService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _configuration;
        private readonly IOtpService _otpService;
        private readonly IGenericRepository<TemporaryUserEntity> _tempUserRepository;

        public UserService(
            IPasswordHasherService passwordHasherService,
            IJwtTokenService jwtTokenService,
            IConfiguration configuration,
            IGenericRepository<UserEntity> userRepository,
            IGenericRepository<RoleEntity> roleRepository,
            IOtpService otpService,
            IGenericRepository<TemporaryUserEntity> temporaryUserRepository)
        {
            _passwordHasherService = passwordHasherService;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
            _userRepository = userRepository;
            _otpService = otpService;
            _roleRepository = roleRepository;
            _tempUserRepository = temporaryUserRepository;

        }

        public async Task<string?> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetWithIncludeAsync(
                u => u.Email == loginDto.Email,
                u => u.Role // Include the Role navigation property
            );

            if (user == null) return null;

            var isPasswordValid = _passwordHasherService.VerifyPassword(user.Password, loginDto.Password);
            if (!isPasswordValid) return null;

            var token = _jwtTokenService.GenerateToken(user);
            return token;
        }



        public async Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto)
        {
            var user = (await _userRepository.FindAsync(u => u.Email == dto.Email)).FirstOrDefault();
            if (user == null) return null;

            var token = _jwtTokenService.GeneratePasswordResetToken(user);
            var clientAppBaseUrl = _configuration["AppSettings:ClientAppBaseUrl"];
            //var resetLink = $"{clientAppBaseUrl}/reset-password?token={token}&email={dto.Email}";
            var resetLink = $"{clientAppBaseUrl}reset-password";


            var otp = _otpService.GenerateAndCacheOtp(dto.Email);
            var subject = "Reset Your Password";
            await EmailHelper.SendUserEmailAsync(dto.Email, subject, resetLink);

            return token;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto dto, string token, string email)
        {
            if (dto.NewPassword != dto.ConfirmPassword)
                return false;

            var principal = _jwtTokenService.GetPrincipalFromToken(token);
            if (principal == null) return false;

            var emailClaim = principal.FindFirst(ClaimTypes.Email);
            if (emailClaim == null) return false;

            var user = (await _userRepository.FindAsync(u => u.Email == emailClaim.Value)).FirstOrDefault();
            if (user == null) return false;

            user.Password = _passwordHasherService.HashPassword(dto.NewPassword);
            _userRepository.Update(user);
           await _userRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RegisterAsync(RegisterDto model)
        {
            try
            {
                // Step 1: Check if user already exists
                var exists = (await _userRepository.FindAsync(x => x.Email == model.Email)).Any();
                if (exists || model.Password != model.ConfirmPassword)
                    return false;

                // Step 2: Hash password
                var hashedPassword = _passwordHasherService.HashPassword(model.Password);

                // Step 3: Determine Role
                RoleEntity? role;
                if (model.RoleId == 0 || model.RoleId == null)
                {
                    role = (await _roleRepository.FindAsync(r => r.Name == "User")).FirstOrDefault();
                }
                else
                {
                    role = await _roleRepository.GetByIdAsync(model.RoleId);
                }

                if (role == null)
                    throw new Exception("Role not found.");

                // Step 4: Generate OTP and store in TemporaryUserEntity
                var otp = _otpService.GenerateAndCacheOtp(model.Email);
                await EmailHelper.SendOtpAsync(model.Email, otp);

                var tempUser = new TemporaryUserEntity
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Password = hashedPassword,
                    PhoneNumber = model.PhoneNumber,
                    Gender = model.Gender,
                    DOB = model.DOB,
                    DeskNo = model.DeskNo,
                    RoleId = role.Id,
                    Role = role,
                    OTP = otp,
                    ExpiryTime = DateTime.UtcNow.AddMinutes(5)
                };

                // Map DTO to TemporaryUserEntity
               // var expiryTime = DateTime.UtcNow.AddMinutes(5);
               // var tempUser = UserMapper.MapToTemporaryUserEntity(model, role, hashedPassword, otp, expiryTime);

                var created = await _tempUserRepository.AddAsync(tempUser); // Use temp repo
                return created != null;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during registration.", ex);
            }
        }


        public async Task<bool> VerifyOtpAsync(string email, string inputOtp, Guid? creatorId = null)
        {
            var tempUser = (await _tempUserRepository.FindAsync(u => u.Email == email)).FirstOrDefault();

            if (tempUser == null || tempUser.OTP != inputOtp || tempUser.ExpiryTime < DateTime.UtcNow)
                return false;
            RoleEntity? role;
            role = await _roleRepository.GetByIdAsync(tempUser.RoleId);

            var user = new UserEntity
            {
                FirstName = tempUser.FirstName,
                LastName = tempUser.LastName,
                Email = tempUser.Email,
                Password = tempUser.Password,
                PhoneNumber = tempUser.PhoneNumber,
                Gender = tempUser.Gender,
                DOB = tempUser.DOB,
                DeskNo = tempUser.DeskNo,
                Role = tempUser.Role,
                IsActive = true,
                UserAudit = new UserAuditEntity
                {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.UtcNow,
                    CreatedBy = creatorId ?? tempUser.Id, // Set self if created by self
                    UserId = tempUser.Id
                },
            };
           // var user = UserMapper.MapToUserEntity(tempUser, creatorId);
            var res = await _userRepository.AddAsync(user);
            if(res != null)
            {
                return true;
            }
            _tempUserRepository.Remove(tempUser);

            return false;
        }

        public async Task<bool> ResendOtpAsync(string email)
        {
            var tempUser = (await _tempUserRepository.FindAsync(u => u.Email == email)).FirstOrDefault();
            if (tempUser == null)
                return false;

            var newOtp = _otpService.GenerateAndCacheOtp(email);
            tempUser.OTP = newOtp;
            tempUser.ExpiryTime = DateTime.UtcNow.AddMinutes(5);

            _tempUserRepository.Update(tempUser);
            await EmailHelper.SendOtpAsync(email, newOtp);

            return true;
        }


    }
}
