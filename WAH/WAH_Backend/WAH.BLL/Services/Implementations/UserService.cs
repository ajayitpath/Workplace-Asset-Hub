using Microsoft.AspNetCore.Http;
using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels;
using WAH.DAL.EntityModels;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services.Implementations
{
    public class UserService: IUserService
    {
        private readonly IGenericRepository<UserEntity> _userRepository;
        private readonly IPasswordHasherService _passwordHasher;
        public UserService(IGenericRepository<UserEntity> userRepository, IPasswordHasherService passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<bool> RegisterAsync(RegisterDto model)
        {
            try
            {
                var exists = (await _userRepository.FindAsync(x => x.Email == model.Email)).Any();
                if (!exists)
                {
                    string? profileImagePath = null;

                    //  Save profile image and get path
                    if (model.profileImageUrl != null)
                    {
                        profileImagePath = await SaveProfileImage(model.profileImageUrl);
                    }
                    // Hash the password before storing
                    var hashedPassword = _passwordHasher.HashPassword(model.Password);

                    var registration = new UserEntity
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Password = hashedPassword,
                        Email = model.Email,
                        Gender = model.Gender,
                        PhoneNumber = model.PhoneNumber,
                        DOB = model.DOB,
                        DeskNo = model.DeskNo,
                        ProfileImage = profileImagePath
                    };

                    var response = await _userRepository.AddAsync(registration);
                    if(response != null)
                    {

                        return true;
                    }
                    
                    return false;
                }
                return false;
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }
        private async Task<string> SaveProfileImage(IFormFile file)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var fullPath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

          
            return Path.Combine("uploads", fileName).Replace("\\", "/");
        }


    }
}
