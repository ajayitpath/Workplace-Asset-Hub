using Microsoft.EntityFrameworkCore;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.DAL.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Auth Entities
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<RoleEntity> Roles { get; set; }

        public DbSet<AssetEntity> Assets { get; set; }
        public DbSet<AssetItemEntity> AssetItems { get; set; }
        public DbSet<AssetCategoryEntity> AssetCategories { get; set; }
        public DbSet<AssetStatusEntity> AssetStatuses { get; set; }
        public DbSet<LocationEntity> Locations { get; set; }
        public DbSet<AssetAssignmentEntity> AssetAssignments { get; set; }
        public DbSet<AssetRequestEntity> AssetRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Applies all IEntityTypeConfiguration<T> from current assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
