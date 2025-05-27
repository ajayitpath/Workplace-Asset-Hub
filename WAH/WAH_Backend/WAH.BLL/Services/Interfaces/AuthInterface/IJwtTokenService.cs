using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WAH.DAL.EntityModels;

namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IJwtTokenService
    {
        string GenerateToken(UserEntity user);
        string GeneratePasswordResetToken(UserEntity user);
        ClaimsPrincipal? GetPrincipalFromToken(string token);
    }
}
