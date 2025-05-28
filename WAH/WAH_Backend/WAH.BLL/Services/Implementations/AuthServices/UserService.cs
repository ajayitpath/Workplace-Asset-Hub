using Microsoft.Extensions.Configuration;
using System.Security.Claims;
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
        private readonly IGenericRepository<UserEntity> _genericRepository;
        private readonly IPasswordHasherService _passwordHasherService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _configuration;
        private readonly IOtpService _otpService;

        public UserService(
            IPasswordHasherService passwordHasherService,
            IJwtTokenService jwtTokenService,
            IConfiguration configuration,
            IGenericRepository<UserEntity> genericRepository,
            IOtpService otpService)
        {
            _passwordHasherService = passwordHasherService;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
            _genericRepository = genericRepository;
            _otpService = otpService;
        }

        public async Task<string?> LoginAsync(LoginDto loginDto)
        {
            var user = (await _genericRepository.FindAsync(u => u.Email == loginDto.Email)).FirstOrDefault();
            if (user == null) return null;

            var isPasswordValid = _passwordHasherService.VerifyPassword(user.Password, loginDto.Password);
            if (!isPasswordValid) return null;

            var token = _jwtTokenService.GenerateToken(user);
            return token;
        }

        public async Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto)
        {
            var user = (await _genericRepository.FindAsync(u => u.Email == dto.Email)).FirstOrDefault();
            if (user == null) return null;

            var token = _jwtTokenService.GeneratePasswordResetToken(user);
            var clientAppBaseUrl = _configuration["AppSettings:ClientAppBaseUrl"];
            var resetLink = $"{clientAppBaseUrl}/reset-password?token={token}&email={dto.Email}";

            var otp = _otpService.GenerateAndCacheOtp(dto.Email);
            var subject = "Reset Your Password";
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
            _genericRepository.Update(user);

            return true;
        }

        public async Task<bool> RegisterAsync(RegisterDto model)
        {
            try
            {
                var exists = (await _genericRepository.FindAsync(x => x.Email == model.Email)).Any();
                if (exists || model.Password != model.ConfirmPassword)
                    return false;

                var hashedPassword = _passwordHasherService.HashPassword(model.Password);

                var newUser = new UserEntity
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Password = hashedPassword,
                    Email = model.Email,
                    Gender = model.Gender,
                    PhoneNumber = model.PhoneNumber,
                    DOB = model.DOB,
                    DeskNo = model.DeskNo
                    // Do not assign ConfirmPassword or UserProfile here
                };

                var otp = _otpService.GenerateAndCacheOtp(model.Email);
                await EmailHelper.SendOtpAsync(model.Email, otp);

                var result = _otpService.ValidateOtp(model.Email,otp);
                if (result)
                {
                var createdUser = await _genericRepository.AddAsync(newUser);
                return createdUser != null;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during registration.", ex);
            }
        }

        public async Task<bool> VerifyOtpAsync(string email, string otp)
        {
            var isValidOtp = _otpService.ValidateOtp(email, otp);
            if (!isValidOtp)
                return false;

            var user = (await _genericRepository.FindAsync(d => d.Email == email)).FirstOrDefault();
            return user != null;
        }
    }
}
