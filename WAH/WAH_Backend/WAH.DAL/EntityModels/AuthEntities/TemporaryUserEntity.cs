using WAH.Common.Enums;

namespace WAH.DAL.EntityModels.AuthEntities
{
    public class TemporaryUserEntity
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
        public int RoleId { get; set; }               
        public RoleEntity Role { get; set; } = null!;  
        public string OTP { get; set; } = string.Empty;
        public DateTime ExpiryTime { get; set; }
        public string? DeskNo { get; set; }
    }

}
