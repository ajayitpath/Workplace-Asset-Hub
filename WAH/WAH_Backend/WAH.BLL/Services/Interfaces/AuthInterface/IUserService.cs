using WAH.Common.DtoModels.AuthDtos;

namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(RegisterDto model);
        Task<string?> LoginAsync(LoginDto loginDto);
        Task<string?> ForgotPasswordAsync(ForgotPasswordDto dto);
<<<<<<< HEAD
<<<<<<< HEAD
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
        Task<bool> VerifyOtpAsync(VerifyOtpDto verifyOtpDto);
=======
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto, string token , string email);
<<<<<<< HEAD
        Task<bool> VerifyOtpAsync(string email,string otp);
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
=======
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto, string token , string email);
        Task<bool> VerifyOtpAsync(string email,string otp);
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
=======
        Task<bool> VerifyOtpAsync(string email,string otp, Guid? creatorId = null);

        Task<bool> ResendOtpAsync(string email);



>>>>>>> be956539dad1298027f4584fd080631709eed677

    }
}
