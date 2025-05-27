using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WAH.DAL.EntityModels.AuthEntities;

namespace WAH.DAL.Data.EntityConfigs.UserEntityConfig
{
    public class UserProfileEntityConfig : IEntityTypeConfiguration<UserProfileEntity>
    {
        public void Configure(EntityTypeBuilder<UserProfileEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.ProfileImage)
                   .HasMaxLength(255);

            builder.HasOne(p => p.User)
                .WithOne(u => u.UserProfile)
                .HasForeignKey<UserProfileEntity>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
