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
        private readonly IMemoryCache _cache;

        public UserService(IPasswordHasherService passwordHasherService, IJwtTokenService jwtTokenService, IConfiguration configuration, IGenericRepository<UserEntity> genericRepository,IMemoryCache memoryCache)
        {
            _passwordHasherService = passwordHasherService;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
            _genericRepository = genericRepository;
            _cache = memoryCache;
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
                if (!exists)
                {
                    string? profileImagePath = null;

                    //  Save profile image and get path
                    if (model.profileImageUrl != null)
                    {
                        profileImagePath = await SaveProfileImage(model.profileImageUrl);
                    }
                    // Hash the password before storing
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
                        ProfileImage = profileImagePath
                    };

                    var response = await _genericRepository.AddAsync(registration);

                    if (response != null)
                    {
                        var otp = new Random().Next(100000, 999999).ToString();
                        _cache.Set($"OTP_{model.Email}", otp, TimeSpan.FromMinutes(5));
                        await EmailHelper.SendOtpAsync(model.Email, otp);
                        return true;
                    }

                    return false;
                }
                return false;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        private async Task<string> SaveProfileImage(IFormFile file)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var fullPath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }


            return Path.Combine("uploads", fileName).Replace("\\", "/");
        }
    }
}
