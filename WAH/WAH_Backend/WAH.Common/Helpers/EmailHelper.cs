using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace WAH.Common.Helpers
{
    public static class EmailHelper
    {
        public static async Task SendOtpAsync(string email, string otp)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("OtpAuthApi", "ajaym.itpath@gmail.com"));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "Your OTP Code";
            message.Body = new TextPart("plain") { Text = $"Your OTP is: {otp}" };

            using var client = new SmtpClient();

            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync("ajaym.itpath@gmail.com", "your-app-password");
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
