using WAH.Common.DtoModels.AuthDtos;

namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(RegisterDto model);
        Task<string?> LoginAsync(LoginDto loginDto);
        Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto);
<<<<<<< HEAD
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
        Task<bool> VerifyOtpAsync(VerifyOtpDto verifyOtpDto);
=======
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto, string token , string email);
        Task<bool> VerifyOtpAsync(string email,string otp);
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26

    }
}
