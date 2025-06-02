using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.Data.EntityConfigs.UserEntityConfig
{
    public class TemporaryUserEntityConfig : IEntityTypeConfiguration<TemporaryUserEntity>
    {
        public void Configure(EntityTypeBuilder<TemporaryUserEntity> builder)
        {
            builder.ToTable("TemporaryUsers");

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

            builder.Property(u => u.Gender)
                   .IsRequired();

            builder.Property(u => u.DOB)
                   .IsRequired()
                   .HasConversion(
                        v => v.ToDateTime(TimeOnly.MinValue),
                        v => DateOnly.FromDateTime(v))
                   .HasColumnType("datetime");

            builder.Property(u => u.DeskNo)
                   .HasMaxLength(20);

            builder.Property(u => u.RoleId)
                   .IsRequired();

            builder.HasOne(u => u.Role)
                   .WithMany()
                   .HasForeignKey(u => u.RoleId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Property(u => u.OTP)
                   .IsRequired()
                   .HasMaxLength(10);

            builder.Property(u => u.ExpiryTime)
                   .IsRequired();

            builder.Ignore(u => u.ConfirmPassword);
        }
    }

}
