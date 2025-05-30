namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetRequestCreateDto
    {
        public Guid AssetId { get; set; }
        public Guid UserId { get; set; }
        public int QuantityRequested { get; set; }
    }

}
