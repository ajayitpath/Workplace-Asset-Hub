using Microsoft.EntityFrameworkCore;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.EntityModels.InventoryEntities;

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
        public DbSet<UserProfileEntity> UserProfiles { get; set; }
        // Audit Entities
        public DbSet<UserAuditEntity> UserAudits { get; set; }
        //Temporary User Entity with OTP
        public DbSet<TemporaryUserEntity> TemporaryUsers { get; set; }
        // Asset Entities
        public DbSet<AssetEntity> Assets { get; set; }
        public DbSet<AssetItemEntity> AssetItems { get; set; }
        public DbSet<AssetCategoryEntity> AssetCategories { get; set; }
        public DbSet<LocationEntity> Locations { get; set; }
        public DbSet<AssetAssignmentEntity> AssetAssignments { get; set; }
        public DbSet<AssetRequestEntity> AssetRequests { get; set; }
        // Inventory Entities
        public DbSet<InventoryEntity> Inventories { get; set; }
        public DbSet<StockInEntity> StockIns { get; set; }
        public DbSet<StockOutEntity> StockOuts { get; set; }
        public DbSet<InventoryAuditEntity> InventoryAudits { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Applies all IEntityTypeConfiguration<T> from current assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
