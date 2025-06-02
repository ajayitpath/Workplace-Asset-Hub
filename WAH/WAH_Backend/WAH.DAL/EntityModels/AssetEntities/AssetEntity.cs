namespace WAH.DAL.EntityModels.AssetEntities
{
    public class AssetEntity
    {
        public Guid AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetCode { get; set; }  
        public Guid CategoryId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Specification { get; set; }
        public int QuantityTotal { get; set; }
        public bool IsActive { get; set; } = true;

        // Navigation
        public AssetCategoryEntity Category { get; set; }
        public ICollection<AssetItemEntity> AssetItems { get; set; }
    }
}
