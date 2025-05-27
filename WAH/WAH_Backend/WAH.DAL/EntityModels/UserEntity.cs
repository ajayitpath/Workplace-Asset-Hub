using WAH.Common.Enums;

namespace WAH.DAL.EntityModels
{
    public class UserEntity
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? ConfirmPassword { get; set; }

        public string? PhoneNumber { get; set; }  

        public string Email { get; set; } = string.Empty;

        public Gender Gender { get; set; }

        public DateOnly DOB { get; set; }

        public string? DeskNo { get; set; }

        public UserProfileEntity UserProfile { get; set; }
    }
}
