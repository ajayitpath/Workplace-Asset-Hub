namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetRequestDto
    {
        public Guid RequestId { get; set; }
        public Guid AssetId { get; set; }
        public Guid UserId { get; set; }
        public int QuantityRequested { get; set; }
        public string Status { get; set; }
        public DateTime RequestedAt { get; set; }
    }
}
