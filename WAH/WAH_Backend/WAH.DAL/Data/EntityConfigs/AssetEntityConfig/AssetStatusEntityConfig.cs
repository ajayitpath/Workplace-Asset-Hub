using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class AssetStatusEntityConfig : IEntityTypeConfiguration<AssetStatusEntity>
    {
        public void Configure(EntityTypeBuilder<AssetStatusEntity> builder)
        {
            builder.ToTable("AssetStatuses");

            builder.HasKey(s => s.StatusId);

            builder.Property(s => s.StatusName)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
