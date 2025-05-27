using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class LocationEntityConfiguration : IEntityTypeConfiguration<LocationEntity>
    {
        public void Configure(EntityTypeBuilder<LocationEntity> builder)
        {
            builder.ToTable("Locations");

            builder.HasKey(l => l.LocationId);

            builder.Property(l => l.LocationName)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
