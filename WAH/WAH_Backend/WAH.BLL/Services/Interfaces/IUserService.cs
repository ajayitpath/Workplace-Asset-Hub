using WAH.Common.DtoModels;
using WAH_API.DTO;

namespace WAH.BLL.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(RegisterDto model);
        Task<string?> LoginAsync(LoginDto loginDto);
        Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
        Task<bool> VerifyOtpAsync(VerifyOtpDto verifyOtpDto);

    }
}
