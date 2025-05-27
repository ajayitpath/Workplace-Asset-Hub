using WAH.BLL.Services.Interfaces;
using WAH.Common.Enums;
using WAH.DAL.Data;
using WAH.DAL.EntityModels;
using WAH.DAL.EntityModels.AuthEntities;

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
            // Step 1: Ensure the required roles exist
            var rolesToSeed = new[] { "Admin", "User", "Manager" };

            foreach (var roleName in rolesToSeed)
            {
                if (!_context.Roles.Any(r => r.Name == roleName))
                {
                    _context.Roles.Add(new RoleEntity
                    {
                        Id = Guid.NewGuid(),
                        Name = roleName,
                        isActive = true
                    });
                }
            }

            _context.SaveChanges();

            // Step 2: Get the Admin role reference
            var adminRole = _context.Roles.First(r => r.Name == "Admin");

            // Step 3: Seed the system admin user if not already present
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
                    Role = adminRole
                };

                _context.Users.Add(admin);
                _context.SaveChanges();
            }
        }

    }
}
