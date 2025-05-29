using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.Data.EntityConfigs.UserEntityConfig
{
    public class UserEntityConfig : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("Users");

            builder.HasQueryFilter(u => u.IsActive);

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id)
                   .HasDefaultValueSql("NEWSEQUENTIALID()")
                   .ValueGeneratedOnAdd();

            builder.Property(u => u.FirstName)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(u => u.LastName)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(u => u.Password)
                   .IsRequired();

            builder.Property(u => u.Email)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.HasIndex(u => u.Email)
                   .IsUnique();

            builder.Property(u => u.PhoneNumber)
                   .HasMaxLength(10);

            builder.HasIndex(u => u.PhoneNumber)
                   .IsUnique();

            builder.Property(u => u.Gender)
                   .IsRequired();

            builder.Property(u => u.DOB)
        .IsRequired()
        .HasConversion(
            v => v.ToDateTime(TimeOnly.MinValue),   // Convert DateOnly to DateTime
            v => DateOnly.FromDateTime(v))          // Convert DateTime to DateOnly
        .HasColumnType("datetime");

            builder.Property(u => u.DeskNo)
                   .HasMaxLength(20);

            builder.Property(u => u.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            builder.Ignore(u => u.ConfirmPassword);

            builder.HasOne(u => u.Role)
                   .WithMany(r => r.Users)
                   .HasForeignKey("RoleId")
                   .IsRequired()
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
