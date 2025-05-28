namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetEntityDto
    {
        public Guid AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetCode { get; set; }
        public Guid CategoryId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Specification { get; set; }
        public int QuantityTotal { get; set; }
    }
}
