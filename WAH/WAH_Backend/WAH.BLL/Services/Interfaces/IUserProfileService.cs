using WAH.Common.DtoModels;

namespace WAH.BLL.Services.Interfaces
{
    public interface IUserProfileService
    {
        Task<string> SaveProfileImageAsync(UserProfileDto dto);
    }
}
