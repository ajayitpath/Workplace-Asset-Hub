using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WAH.BLL.Services.Interfaces.AuthInterface;

namespace WAH.BLL.Services.Implementations.AuthServices
{
    public class OtpService : IOtpService
    {
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _otpExpiry = TimeSpan.FromMinutes(5);

        public OtpService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public string GenerateAndCacheOtp(string email)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            _cache.Set(email, otp, _otpExpiry);
            return otp;
        }

        public bool ValidateOtp(string email, string otp)
        {
            if (_cache.TryGetValue(email, out string cachedOtp) && cachedOtp == otp)
            {
                _cache.Remove(email); //Remove OTP after successful verification
                return true;
            }
            return false;
        }
    }
}
