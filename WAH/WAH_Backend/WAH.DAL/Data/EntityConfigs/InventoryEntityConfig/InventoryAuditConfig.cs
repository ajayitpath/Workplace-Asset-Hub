using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.InventoryEntities;

namespace WAH.DAL.Data.EntityConfigs.InventoryEntityConfig
{
    public class InventoryAuditConfig : IEntityTypeConfiguration<InventoryAuditEntity>
    {
        public void Configure(EntityTypeBuilder<InventoryAuditEntity> builder)
        {
            builder.ToTable("InventoryAudits");

            builder.HasKey(x => x.AuditId);

            builder.Property(x => x.ExpectedQuantity)
                   .IsRequired();

            builder.Property(x => x.ActualQuantity)
                   .IsRequired();

            builder.Property(x => x.AuditDate)
                   .IsRequired();

            builder.Property(x => x.AuditedBy)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.HasOne(x => x.Asset)
                   .WithMany()
                   .HasForeignKey(x => x.AssetId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
