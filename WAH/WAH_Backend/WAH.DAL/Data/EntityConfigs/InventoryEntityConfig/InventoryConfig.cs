using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.InventoryEntities;

namespace WAH.DAL.Data.EntityConfigs.InventoryEntityConfig
{
    public class InventoryConfig : IEntityTypeConfiguration<InventoryEntity>
    {
        public void Configure(EntityTypeBuilder<InventoryEntity> builder)
        {
            builder.ToTable("Inventories");
            builder.HasKey(x => x.InventoryId);

            builder.HasOne(x => x.Asset)
                   .WithMany()
                   .HasForeignKey(x => x.AssetId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Location)
                   .WithMany()
                   .HasForeignKey(x => x.LocationId)
                   .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
