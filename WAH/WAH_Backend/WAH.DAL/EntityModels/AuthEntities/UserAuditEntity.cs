namespace WAH.DAL.EntityModels.AuthEntities
{
    public class UserAuditEntity
    {
        public Guid Id { get; set; }  // Primary key

        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public Guid CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }

        // FK to User
        public Guid UserId { get; set; }
        public UserEntity User { get; set; } = null!;
    }
}
