using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.EntityModels.InventoryEntities
{
    public class StockInEntity
    {
        public Guid StockInId { get; set; }
        public Guid AssetId { get; set; }
        public int Quantity { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string ReceivedBy { get; set; } // Could be userId or employee name

        public AssetEntity Asset { get; set; }
    }

}   
