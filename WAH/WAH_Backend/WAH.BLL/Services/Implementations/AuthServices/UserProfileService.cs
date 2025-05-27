using WAH.BLL.Services.Interfaces.AuthInterface;
using WAH.Common.DtoModels.AuthDtos;

namespace WAH.BLL.Services.Implementations.AuthServices
{
    public class UserProfileService : IUserProfileService
    {
        private readonly string[] _allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        public async Task<string> SaveProfileImageAsync(UserProfileDto dto)
        {
            var file = dto.File;

            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty.");
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!_allowedExtensions.Contains(extension))
                throw new Exception("Invalid image file type.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{extension}";
            var fullPath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return relative path to save in DB
            return Path.Combine("uploads", fileName).Replace("\\", "/");
        }
    }
}
