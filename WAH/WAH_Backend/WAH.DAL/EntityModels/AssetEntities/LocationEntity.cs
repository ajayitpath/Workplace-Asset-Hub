namespace WAH.DAL.EntityModels.AssetEntities
{
    public class LocationEntity
    {
        public Guid LocationId { get; set; }
        public string LocationName { get; set; }
        // Navigation
        public ICollection<AssetItemEntity> AssetItems { get; set; }
    }
}
