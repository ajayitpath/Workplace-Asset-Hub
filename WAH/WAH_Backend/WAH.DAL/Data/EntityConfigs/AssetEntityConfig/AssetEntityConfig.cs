using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class AssetEntityConfig : IEntityTypeConfiguration<AssetEntity>
    {
        public void Configure(EntityTypeBuilder<AssetEntity> builder)
        {
            builder.ToTable("Assets");

            builder.HasKey(a => a.AssetId);

            builder.Property(a => a.AssetName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(a => a.AssetCode)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(a => a.Brand)
                .HasMaxLength(100);

            builder.Property(a => a.Model)
                .HasMaxLength(100);

            builder.Property(a => a.Specification)
                .HasMaxLength(500);

            builder.HasOne(a => a.Category)
                .WithMany(c => c.Assets)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
