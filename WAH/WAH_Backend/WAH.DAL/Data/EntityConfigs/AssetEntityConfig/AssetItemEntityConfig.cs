using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class AssetItemEntityConfig : IEntityTypeConfiguration<AssetItemEntity>
    {
        public void Configure(EntityTypeBuilder<AssetItemEntity> builder)
        {
            builder.ToTable("AssetItems");

            builder.HasKey(ai => ai.AssetItemId);

            builder.Property(ai => ai.SerialNumber)
                .HasMaxLength(100);

            builder.Property(ai => ai.PurchaseDate)
                .IsRequired();

            builder.HasOne(ai => ai.Asset)
                .WithMany(a => a.AssetItems)
                .HasForeignKey(ai => ai.AssetId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ai => ai.Status)
                .WithMany(s => s.AssetItems)
                .HasForeignKey(ai => ai.StatusId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(ai => ai.Location)
                .WithMany(l => l.AssetItems)
                .HasForeignKey(ai => ai.LocationId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
