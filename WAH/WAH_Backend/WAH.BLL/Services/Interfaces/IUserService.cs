using WAH.Common.DtoModels;

namespace WAH.BLL.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(RegisterDto model);
    }
}
