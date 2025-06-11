using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.InventoryEntities;

namespace WAH.DAL.Data.EntityConfigs.InventoryEntityConfig
{
    public class StockInConfig : IEntityTypeConfiguration<StockInEntity>
    {
        public void Configure(EntityTypeBuilder<StockInEntity> builder)
        {
            builder.ToTable("StockIns");
            builder.HasKey(x => x.StockInId);

            builder.Property(x => x.ReceivedBy)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(x => x.ReceivedDate)
                   .IsRequired();

            builder.HasOne(x => x.Asset)
                   .WithMany()
                   .HasForeignKey(x => x.AssetId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
