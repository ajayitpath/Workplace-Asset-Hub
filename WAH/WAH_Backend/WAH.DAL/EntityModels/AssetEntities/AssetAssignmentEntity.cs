using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.EntityModels.AssetEntities
{
    public class AssetAssignmentEntity
    {
        public Guid AssignmentId { get; set; }
        public Guid AssetItemId { get; set; }
        public Guid UserId { get; set; }

        public DateTime AssignedDate { get; set; }
        public DateTime? ReturnedDate { get; set; }

        // Navigation
        public AssetItemEntity AssetItem { get; set; } = null!;
        public UserEntity User { get; set; } = null!;
    }
}
