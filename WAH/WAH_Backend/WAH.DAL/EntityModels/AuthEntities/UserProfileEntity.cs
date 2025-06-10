namespace WAH.DAL.EntityModels.AuthEntities
{
    public class UserProfileEntity
    {
        public Guid Id { get; set; }             // Primary key
        public Guid UserId { get; set; }         // Foreign key to UserEntity
        public UserEntity User { get; set; }     // Navigation property
        public string? ProfileImage { get; set; }
    }
}
    