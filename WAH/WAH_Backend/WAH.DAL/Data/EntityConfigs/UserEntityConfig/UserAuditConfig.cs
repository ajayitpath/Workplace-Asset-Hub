using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.Configurations
{
    public class UserAuditEntityConfiguration : IEntityTypeConfiguration<UserAuditEntity>
    {
        public void Configure(EntityTypeBuilder<UserAuditEntity> builder)
        {
            // Explicit table name to avoid unintended renaming
            builder.ToTable("UserAudit");

            builder.HasKey(ua => ua.Id);

            builder.Property(ua => ua.CreateDate)
                   .IsRequired();

            builder.Property(ua => ua.UpdateDate)
                   .IsRequired(false);

            builder.Property(ua => ua.CreatedBy)
                   .IsRequired();

            builder.Property(ua => ua.UpdatedBy)
                   .IsRequired(false);

            builder.HasOne(ua => ua.User)
                   .WithOne(u => u.UserAudit)
                   .HasForeignKey<UserAuditEntity>(ua => ua.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
