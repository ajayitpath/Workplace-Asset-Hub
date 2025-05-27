using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.EntityModels.AssetEntities
{
    public class AssetRequestEntity
    {
        public Guid RequestId { get; set; }
        public Guid AssetId { get; set; }
        public Guid UserId { get; set; }

        public int QuantityRequested { get; set; }
        public string Status { get; set; } // Pending, Approved, Rejected
        public DateTime RequestedAt { get; set; }

        // Navigation
        public AssetEntity Asset { get; set; } = null!;
        public UserEntity User { get; set; } = null!;
    }

}
