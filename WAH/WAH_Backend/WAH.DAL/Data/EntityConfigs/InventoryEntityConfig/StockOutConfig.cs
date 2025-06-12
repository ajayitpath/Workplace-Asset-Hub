using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.InventoryEntities;

namespace WAH.DAL.Data.EntityConfigs.InventoryEntityConfig
{
    public class StockOutConfig : IEntityTypeConfiguration<StockOutEntity>
    {
        public void Configure(EntityTypeBuilder<StockOutEntity> builder)
        {
            builder.ToTable("StockOuts");
            builder.HasKey(x => x.StockOutId);

            builder.Property(x => x.IssuedBy)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(x => x.IssuedTo)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(x => x.IssuedDate)
                   .IsRequired();

            builder.HasOne(x => x.Asset)
                   .WithMany()
                   .HasForeignKey(x => x.AssetId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
