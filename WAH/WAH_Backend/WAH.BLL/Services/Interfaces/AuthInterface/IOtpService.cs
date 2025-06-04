namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IOtpService
    {
        string GenerateAndCacheOtp(string email);
        bool ValidateOtp(string email, string otp);
    }
}
