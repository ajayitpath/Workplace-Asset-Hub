using WAH.Common.DtoModels.AuthDtos;

namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(RegisterDto model);
        Task<string?> LoginAsync(LoginDto loginDto);
        Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
        Task<bool> VerifyOtpAsync(VerifyOtpDto verifyOtpDto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto, string token , string email);
        Task<bool> VerifyOtpAsync(string email,string otp);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto, string token , string email);
        Task<bool> VerifyOtpAsync(string email,string otp);
        Task<bool> VerifyOtpAsync(string email,string otp, Guid? creatorId = null);

        Task<bool> ResendOtpAsync(string email);

    }
}
