using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data.EntityConfigs.AssetEntities
{
    public class AssetAssignmentEntityConfig : IEntityTypeConfiguration<AssetAssignmentEntity>
    {
        public void Configure(EntityTypeBuilder<AssetAssignmentEntity> builder)
        {
            builder.ToTable("AssetAssignments");

            builder.HasKey(aa => aa.AssignmentId);

            builder.Property(aa => aa.AssignedDate).IsRequired();

            builder.HasOne(aa => aa.AssetItem)
                .WithMany()
                .HasForeignKey(aa => aa.AssetItemId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(aa => aa.User)
                .WithMany(u => u.AssetAssignments)
                .HasForeignKey(aa => aa.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
