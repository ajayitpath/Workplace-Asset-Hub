using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WAH.BLL.Services.Interfaces
{
    public interface IOtpService
    {
        string GenerateAndCacheOtp(string email);
        bool ValidateOtp(string email, string otp);


    }
}
