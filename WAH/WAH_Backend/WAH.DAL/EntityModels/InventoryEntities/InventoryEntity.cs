using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.EntityModels.InventoryEntities
{
    public class InventoryEntity
    {
        public Guid InventoryId { get; set; }
        public Guid AssetId { get; set; }
        public int QuantityAvailable { get; set; }
        public int QuantityReserved { get; set; } // Requested but not yet issued
        public Guid? LocationId { get; set; }

        public AssetEntity Asset { get; set; }
        public LocationEntity? Location { get; set; }
    }

}
