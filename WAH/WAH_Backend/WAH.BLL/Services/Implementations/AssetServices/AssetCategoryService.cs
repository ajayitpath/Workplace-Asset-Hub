using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels.AssetDtos;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services
{
    public class AssetCategoryService : IAssetCategoryService
    {
        private readonly IGenericRepository<AssetCategoryEntity> _repo;
        public AssetCategoryService(IGenericRepository<AssetCategoryEntity> repo)
        { 
            _repo = repo; 
        }

        public async Task<IEnumerable<AssetCategoryDto>> GetAllAsync()
        {
            var entities = await _repo.GetAllAsync();
            return entities.Select(e => new AssetCategoryDto
            {
                CategoryId = e.CategoryId,
                CategoryName = e.CategoryName
            });
        }

        public async Task<AssetCategoryDto?> GetByIdAsync(Guid id)
        {
            var entity = await _repo.GetByGuidAsync(id);
            if (entity == null) return null;
            return new AssetCategoryDto
            {
                CategoryId = entity.CategoryId,
                CategoryName = entity.CategoryName
            };
        }

        public async Task<AssetCategoryDto> CreateCategory(AssetCategoryDto dto)
        {
           var exists = await _repo.FindAsync(x => x.CategoryName == dto.CategoryName);

            if (exists.Any())
            {
                throw new Exception("Category with the same name already exists.");
            }

            var entity = new AssetCategoryEntity
            {
                CategoryId = Guid.NewGuid(),
                CategoryName = dto.CategoryName
            };

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();

            dto.CategoryId = entity.CategoryId;
            return dto;
        }

        public async Task<bool> UpdateAsync(AssetCategoryDto dto)
        {
            var entity = await _repo.GetByGuidAsync(dto.CategoryId);
            if (entity == null) return false;
            entity.CategoryName = dto.CategoryName;
            _repo.Update(entity);
            await _repo.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _repo.GetByGuidAsync(id);
            if (entity == null) return false;
            _repo.Remove(entity);
            await _repo.SaveChangesAsync();
            return true;
        }

       
    }
}
