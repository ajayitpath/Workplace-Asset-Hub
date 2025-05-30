using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class AssetRequestEntityConfig : IEntityTypeConfiguration<AssetRequestEntity>
    {
        public void Configure(EntityTypeBuilder<AssetRequestEntity> builder)
        {
            builder.ToTable("AssetRequests");

            builder.HasKey(ar => ar.RequestId);

            builder.Property(ar => ar.QuantityRequested).IsRequired();

            builder.Property(ar => ar.Status)
                .IsRequired();

            builder.Property(ar => ar.RequestedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(ar => ar.Asset)
                .WithMany()
                .HasForeignKey(ar => ar.AssetId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(ar => ar.User)
                .WithMany(u => u.AssetRequests)
                .HasForeignKey(ar => ar.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
