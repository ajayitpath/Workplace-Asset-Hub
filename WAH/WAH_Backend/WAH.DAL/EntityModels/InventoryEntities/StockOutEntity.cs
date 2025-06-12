using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.EntityModels.InventoryEntities
{
    public class StockOutEntity
    {
        public Guid StockOutId { get; set; }
        public Guid AssetId { get; set; }
        public int Quantity { get; set; }
        public DateTime IssuedDate { get; set; }
        public string IssuedTo { get; set; }  
        public string IssuedBy { get; set; }
        public AssetEntity Asset { get; set; }
    }

}
