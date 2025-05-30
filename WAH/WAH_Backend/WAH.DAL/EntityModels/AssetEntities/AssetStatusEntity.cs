using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WAH.DAL.EntityModels.AssetEntities
{
    public class AssetStatusEntity
    {
        public Guid StatusId { get; set; }
        public string StatusName { get; set; }  // e.g., "Available", "Assigned", "In Repair", "Lost"

        // Navigation
        public ICollection<AssetItemEntity> AssetItems { get; set; }
    }
}
