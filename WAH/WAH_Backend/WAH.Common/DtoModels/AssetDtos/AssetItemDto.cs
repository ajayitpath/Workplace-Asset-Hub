namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetItemDto
    {
        public Guid AssetItemId { get; set; }
        public Guid AssetId { get; set; }
        public string SerialNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime? WarrantyExpiryDate { get; set; }
        public Guid StatusId { get; set; }
        public Guid? LocationId { get; set; }
    }
}
