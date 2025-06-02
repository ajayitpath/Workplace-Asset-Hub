namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetAssignmentDto
    {
        public Guid AssignmentId { get; set; }
        public Guid AssetItemId { get; set; }
        public Guid UserId { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime? ReturnedDate { get; set; }
    }
}
