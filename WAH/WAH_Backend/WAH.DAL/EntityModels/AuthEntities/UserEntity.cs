using WAH.Common.Enums;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.EntityModels.AuthEntities
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

        public RoleEntity Role { get; set; } = null!;
        public UserAuditEntity UserAudit { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        public UserProfileEntity UserProfile { get; set; } = null!;
        public ICollection<AssetRequestEntity> AssetRequests { get; set; } = new List<AssetRequestEntity>();
        public ICollection<AssetAssignmentEntity> AssetAssignments { get; set; } = new List<AssetAssignmentEntity>();
        public string? DeskNo { get; set; }
    }
}
