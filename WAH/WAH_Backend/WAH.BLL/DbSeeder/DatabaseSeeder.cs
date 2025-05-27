using WAH.BLL.Services.Interfaces;
using WAH.Common.Enums;
using WAH.DAL.Data;
using WAH.DAL.EntityModels;

namespace WAH.BLL.DbSeeder
{
    public class DatabaseSeeder
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasherService _passwordHasher;

        public DatabaseSeeder(AppDbContext context, IPasswordHasherService passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public void SeedAdmin()
        {
            if (!_context.Users.Any(u => u.Email == "admin@wah.com"))
            {
                var admin = new UserEntity
                {
                    FirstName = "System",
                    LastName = "Admin",
                    Email = "admin@wah.com",
                    Password = _passwordHasher.HashPassword("Admin@123"),
                    Gender = Gender.Male,
                    DOB = new DateTime(1990, 1, 1),
                    PhoneNumber = "1234567891",
                    DeskNo = "A-01",
                };

                _context.Users.Add(admin);
                _context.SaveChanges();
            }
        }
    }
}
