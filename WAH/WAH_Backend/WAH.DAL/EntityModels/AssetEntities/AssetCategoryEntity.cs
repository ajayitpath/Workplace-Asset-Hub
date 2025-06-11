namespace WAH.DAL.EntityModels.AssetEntities
{
    public class AssetCategoryEntity
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        //public bool isActive { get; set; }
        // Navigation
        public ICollection<AssetEntity> Assets { get; set; }
    }

}
