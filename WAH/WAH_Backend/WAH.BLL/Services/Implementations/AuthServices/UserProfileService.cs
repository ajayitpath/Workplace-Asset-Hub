using WAH.BLL.Services.Interfaces.AuthInterface;
using WAH.Common.DtoModels.AuthDtos;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services.Implementations.AuthServices
{
    public class UserProfileService : IUserProfileService
    {
        private readonly string[] _allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        private readonly IGenericRepository<UserProfileEntity> _profileRepo;
        public async Task<(bool Success, string Message, string ImagePath)> UpdateUserProfileImageAsync(UserProfileDto dto)
        {
            var imagePath = await SaveProfileImageAsync(dto);
            var existing = (await _profileRepo.FindAsync(p => p.UserId == dto.UserId)).FirstOrDefault();
            if (existing != null)
            {
                existing.ProfileImage = imagePath;
                _profileRepo.Update(existing);
            }
            else
            {
                var newEntity = new UserProfileEntity
                {
                    UserId= (Guid)dto.UserId,
                    ProfileImage = imagePath
                };
                await _profileRepo.AddAsync(newEntity);
            }
            await _profileRepo.SaveChangesAsync();
            return (true, "Profile image updated", imagePath);
        }
        public UserProfileService(IGenericRepository<UserProfileEntity> profileRepo)
        {
            _profileRepo = profileRepo;
        }
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
            return Path.Combine("uploads", fileName).Replace("\\", "/");
        }
    }
}
