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
            message.From.Add(new MailboxAddress("OtpAuthApi", "chaitalis.itpath@gmail.com"));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "Your OTP Code";
            message.Body = new TextPart("plain") { Text = $"Your OTP is: {otp}" };

            using var client = new SmtpClient();

            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync("chaitalis.itpath@gmail.com", "wccg gmkh bxof brpr");
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public static async Task SendUserEmailAsync(string toEmail, string subject, string body)
        {
            var email = new MimeMessage(); 
            email.From.Add(new MailboxAddress("Reset Password:", "chaitalis.itpath@gmail.com"));  

            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;

            var builder = new BodyBuilder { HtmlBody = body };
            email.Body = builder.ToMessageBody();
            using var client = new SmtpClient();

            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync("chaitalis.itpath@gmail.com", "wccg gmkh bxof brpr");
            await client.SendAsync(email);
            await client.DisconnectAsync(true);
        }



    }
}
