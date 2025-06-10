using WAH.Common.DtoModels.AuthDtos;

namespace WAH.BLL.Services.Interfaces.AuthInterface
{
    public interface IUserProfileService
    {
        Task<string> SaveProfileImageAsync(UserProfileDto dto);
        Task<(bool Success, string Message, string ImagePath)> UpdateUserProfileImageAsync(UserProfileDto dto);
    }
}
