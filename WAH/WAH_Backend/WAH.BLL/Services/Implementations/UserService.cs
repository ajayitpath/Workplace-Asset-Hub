using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels;
using WAH.DAL.EntityModels;
using WAH.DAL.Repositories.Interfaces;
using WAH_API.DTO;

using System.Threading.Tasks;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using WAH.Common.Helpers;
using Microsoft.Extensions.Caching.Memory;

namespace WAH.BLL.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<UserEntity> _genericRepository;
        private readonly IPasswordHasherService _passwordHasherService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _configuration;
        private readonly IOtpService _otpService;

        public UserService(IPasswordHasherService passwordHasherService, IJwtTokenService jwtTokenService, IConfiguration configuration, IGenericRepository<UserEntity> genericRepository, IOtpService otpService)
        {
            _passwordHasherService = passwordHasherService;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
            _genericRepository = genericRepository;
            _otpService = otpService;
        }

        public async Task<string?> LoginAsync(LoginDto loginDto)
        {
            var users = await _genericRepository.FindAsync(u => u.Email == loginDto.Email);
            var user = users.FirstOrDefault();

            if (user == null)
                return null;

            var isPasswordValid = _passwordHasherService.VerifyPassword(user.Password, loginDto.Password);
            if (!isPasswordValid)
                return null;

            var token = _jwtTokenService.GenerateToken(user);

            return token;
        }

        public async Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto)
        {
            var user = (await _genericRepository.FindAsync(u => u.Email == dto.Email)).FirstOrDefault();
            if (user == null) return null;

            var token = _jwtTokenService.GeneratePasswordResetToken(user);

            // TODO: Send email here using email service (not included in this code)
            string otp = _otpService.GenerateAndCacheOtp(dto.Email);
            var ClientAppBaseUrl = _configuration["AppSettings:ClientAppBaseUrl"];

            // 4. Generate link
            //var resetLink = $"{ClientAppBaseUrl}/reset-password?token={token}&email={dto.Email}";
            var resetLink = "https://localhost:7126/api/User/reset-password";

            // 5. Send email
            var subject = "Reset Your Password :";

            await EmailHelper.SendUserEmailAsync(dto.Email, subject, resetLink);



            return token;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto dto)
        {
            if (dto.NewPassword != dto.ConfirmPassword)
                return false;

            var principal = _jwtTokenService.GetPrincipalFromToken(dto.Token);
            if (principal == null) return false;

            var emailClaim = principal.FindFirst(ClaimTypes.Email);
            if (emailClaim == null) return false;

            var user = (await _genericRepository.FindAsync(u => u.Email == emailClaim.Value)).FirstOrDefault();
            if (user == null) return false;

            user.Password = _passwordHasherService.HashPassword(dto.NewPassword);
            user.ConfirmPassword = _passwordHasherService.HashPassword(dto.ConfirmPassword);
            _genericRepository.Update(user);
            return true;
        }

        public async Task<bool> RegisterAsync(RegisterDto model)
        {
            try
            {
                var exists = (await _genericRepository.FindAsync(x => x.Email == model.Email)).Any();
                if (exists)
                    return false;

                if (model.Password != model.ConfirmPassword)
                    return false;

                var hashedPassword = _passwordHasherService.HashPassword(model.Password);

                var registration = new UserEntity
                {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Password = hashedPassword,
                        Email = model.Email,
                        Gender = model.Gender,
                        PhoneNumber = model.PhoneNumber,
                        DOB = model.DOB,
                        DeskNo = model.DeskNo,
                };

                    string otp = _otpService.GenerateAndCacheOtp(model.Email);
                    await EmailHelper.SendOtpAsync(model.Email, otp);

                    var response = await _genericRepository.AddAsync(registration);

                    if (response != null)
                    {

                        return true;
                    }

                    return false;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during registration.", ex);
            }

        }



        public async Task<bool> VerifyOtpAsync(VerifyOtpDto dto)
        {

            // If OTP is valid, mark the user as verified
            var IsgetOTP = _otpService.ValidateOtp(dto.Email, dto.Otp);
            if (!IsgetOTP)
                return false;

            var user = await _genericRepository.FindAsync(d => d.Email == dto.Email);
            if (user is null) return false;

            //user.IsVerified = true;
            //await _genericRepository.SaveChangesAsync();

            //_cache.Remove($"OTP_{dto.Email}");
            return true;
        }
    }

    }
