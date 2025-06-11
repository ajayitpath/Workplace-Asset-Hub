using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.EntityModels.InventoryEntities
{
    public class InventoryAuditEntity
    {
        public Guid AuditId { get; set; }
        public Guid AssetId { get; set; }
        public int ExpectedQuantity { get; set; }
        public int ActualQuantity { get; set; }
        public DateTime AuditDate { get; set; }
        public string AuditedBy { get; set; }

        public AssetEntity Asset { get; set; }
    }


}
