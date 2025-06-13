using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels.AssetDtos;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services
{
    public class AssetCategoryService : IAssetCategoryService
    {
        private readonly IGenericRepository<AssetCategoryEntity> _categoryRepo;
        private readonly IGenericRepository<AssetEntity> _assetRepo;

        public AssetCategoryService(
            IGenericRepository<AssetCategoryEntity> categoryRepo,
            IGenericRepository<AssetEntity> assetRepo)
        { 
            _categoryRepo = categoryRepo;
            _assetRepo = assetRepo;
        }
        public async Task<IEnumerable<AssetCategoryDto>> GetAllAsync()
        {
            var entities = await _categoryRepo.GetAllAsync();
            return entities.Select(e => new AssetCategoryDto
            {
                CategoryId = e.CategoryId,
                CategoryName = e.CategoryName
            });
        }
        public async Task<AssetCategoryDto?> GetByIdAsync(Guid id)
        {
            var entity = await _categoryRepo.GetByGuidAsync(id);
            if (entity == null) return null;
            return new AssetCategoryDto
            {
                CategoryId = entity.CategoryId,
                CategoryName = entity.CategoryName
            };
        }
        public async Task<AssetCategoryDto> CreateCategory(AssetCategoryDto dto)
        {
            var exists = await _categoryRepo.FindAsync(x => x.CategoryName == dto.CategoryName);
            if (exists.Any())
            {
                throw new Exception("Category with the same name already exists.");
            }
            var entity = new AssetCategoryEntity
            {
                CategoryId = Guid.NewGuid(),
                CategoryName = dto.CategoryName
            };
            await _categoryRepo.AddAsync(entity);
            await _categoryRepo.SaveChangesAsync();
            dto.CategoryId = entity.CategoryId;
            return dto;
        }

        public async Task<bool> UpdateAsync(AssetCategoryDto dto)
        {
            var entity = await _categoryRepo.GetByGuidAsync(dto.CategoryId);
            if (entity == null) return false;
            entity.CategoryName = dto.CategoryName;
            await _categoryRepo.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _categoryRepo.GetByGuidAsync(id);
            if (entity == null) 
                throw new Exception("Category not found");

            // Check if any assets are using this category
            var assetsUsingCategory = await _assetRepo.FindAsync(a => a.CategoryId == id && a.IsActive);
            if (assetsUsingCategory.Any())
            {
                var assetCount = assetsUsingCategory.Count();
                throw new Exception($"Cannot delete category. There are {assetCount} active asset(s) currently using this category. Please reassign or delete these assets first.");
            }

            _categoryRepo.Remove(entity);
            await _categoryRepo.SaveChangesAsync();
            return true;
        }    
    }
}
