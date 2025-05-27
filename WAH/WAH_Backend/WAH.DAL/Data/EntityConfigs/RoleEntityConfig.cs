using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.EntityConfigs
{
    public class RoleEntityConfig : IEntityTypeConfiguration<RoleEntity>
    {
        public void Configure(EntityTypeBuilder<RoleEntity> builder)
        {
            // Table name (optional)
            builder.ToTable("Roles");

            // Primary key
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
                   .HasDefaultValueSql("NEWSEQUENTIALID()")
                   .ValueGeneratedOnAdd();

            // Name (Required + Unique)
            builder.Property(r => r.Name)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.HasIndex(r => r.Name)
                   .IsUnique();

            // isActive with default value true
            builder.Property(r => r.isActive)
                   .HasDefaultValue(true)
                   .IsRequired();

            // Navigation: One Role has many Users
            builder.HasMany(r => r.Users)
                   .WithOne(u => u.Role)
                   .HasForeignKey("RoleId")
                   .IsRequired()
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
