using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class AssetCategoryEntityConfig : IEntityTypeConfiguration<AssetCategoryEntity>
    {
        public void Configure(EntityTypeBuilder<AssetCategoryEntity> builder)
        {
            builder.ToTable("AssetCategories");

            builder.HasKey(ac => ac.CategoryId);

            builder.Property(ac => ac.CategoryName)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
