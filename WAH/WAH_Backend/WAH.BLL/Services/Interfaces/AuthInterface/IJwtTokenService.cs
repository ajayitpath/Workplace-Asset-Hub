using System.Security.Claims;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IJwtTokenService
    {
        string GenerateToken(UserEntity user);
        string GeneratePasswordResetToken(UserEntity user);
        ClaimsPrincipal? GetPrincipalFromToken(string token);
    }
}
