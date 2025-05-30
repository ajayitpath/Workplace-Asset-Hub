namespace WAH.DAL.EntityModels.AssetEntities
{
    public class AssetItemEntity
    {
        public Guid AssetItemId { get; set; }
        public Guid AssetId { get; set; }
        public string SerialNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime? WarrantyExpiryDate { get; set; }
        public Guid StatusId { get; set; }
        public Guid? LocationId { get; set; }

        // Navigation
        public AssetEntity Asset { get; set; }
        public AssetStatusEntity Status { get; set; }
        public LocationEntity Location { get; set; }
    }
}
