using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WAH.DAL.EntityModels;

namespace WAH.DAL.EntityConfigs
{
    public class UserEntityConfig : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            // Primary Key with SQL Server NEWSEQUENTIALID() default value
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();

            // FirstName & LastName
            builder.Property(u => u.FirstName)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(u => u.LastName)
                   .IsRequired()
                   .HasMaxLength(50);

            // Password (you might hash it before saving)
            builder.Property(u => u.Password)
                   .IsRequired();

            // Email (Required + Unique)
            builder.Property(u => u.Email)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.HasIndex(u => u.Email)
                   .IsUnique();

            // PhoneNumber (Optional + Unique)
            builder.Property(u => u.PhoneNumber)
                   .HasMaxLength(15);

            builder.HasIndex(u => u.PhoneNumber)
                   .IsUnique();

            // Gender (Required Enum stored as int or string)
            builder.Property(u => u.Gender)
                   .IsRequired();

            // DOB
            builder.Property(u => u.DOB)
                   .IsRequired();

            builder.HasOne(u => u.UserProfile)
                .WithOne(p => p.User)
                .HasForeignKey<UserProfileEntity>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Desk Number (Optional but validated)
            builder.Property(u => u.DeskNo)
                   .HasMaxLength(20);

            // Ignore ConfirmPassword - not mapped to DB
            builder.Ignore(u => u.ConfirmPassword);
        }
    }
}
