namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetRequestDto
    {
        public Guid RequestId { get; set; }
        public Guid AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty; 
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty; 
        public int QuantityRequested { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime RequestedAt { get; set; }
    }
}
