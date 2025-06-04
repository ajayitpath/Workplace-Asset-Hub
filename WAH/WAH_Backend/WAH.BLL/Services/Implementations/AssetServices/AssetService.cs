using Microsoft.EntityFrameworkCore;
using WAH.BLL.Mappers;
using WAH.BLL.Services.Interfaces.AssetInterfaces;
using WAH.Common.DtoModels.AssetDtos;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services.Implementations.AssetServices
{
    public class AssetService : IAssetService
    {
        private readonly IGenericRepository<AssetEntity> _assetRepository;
        private readonly IGenericRepository<AssetCategoryEntity> _assetcategoryRepository;
        public AssetService(IGenericRepository<AssetEntity> assetRepository, IGenericRepository<AssetCategoryEntity> assetCategoryRepository)
        {
            _assetRepository = assetRepository;
            _assetcategoryRepository = assetCategoryRepository;  
        }
        public async Task<AssetDto> CreateAssetAsync(AssetDto assetDto)
        {
            if (assetDto == null)
                throw new ArgumentNullException(nameof(assetDto));

            if (string.IsNullOrWhiteSpace(assetDto.AssetName))
                throw new ArgumentException("Asset name is required", nameof(assetDto));
            try
            {
                var categories = await _assetcategoryRepository.FindAsync(c => c.CategoryId== assetDto.CategoryId);
              
                if (!categories.Any())
                    throw new ArgumentException("The specified category does not exist.", nameof(assetDto.CategoryId));

                var asset = AssetMapper.ToEntity(assetDto);
                asset.AssetId = Guid.NewGuid();

                var createdAsset = await _assetRepository.AddAsync(asset);

                if (createdAsset == null)
                    throw new InvalidOperationException("Failed to create asset");

                return AssetMapper.ToDto(createdAsset);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the asset", ex);
            }
        }
        public async Task<AssetDto?> GetAssetByIdAsync(Guid id)
        {
            var asset = await _assetRepository.GetByGuidAsync(id);
            if (asset == null)
                return null;
            var assetDto = AssetMapper.ToDto(asset);
            var category = await _assetcategoryRepository.GetByGuidAsync(asset.CategoryId);
            assetDto.CategoryId = category.CategoryId;
            return assetDto;
        }
        public async Task<AssetDto?> UpdateAssetAsync(Guid assetId, AssetDto assetDto)
        {
            if (assetDto == null)
                throw new ArgumentNullException(nameof(assetDto));
            var existingAsset = await _assetRepository.GetByGuidAsync(assetId);
            if (existingAsset == null)
                return null;
            var categories = await _assetcategoryRepository.FindAsync(c => c.CategoryId == assetDto.CategoryId);
            if (!categories.Any())
                throw new ArgumentException("The specified category does not exist.", nameof(assetDto.CategoryId));
            // Update fields
            existingAsset.AssetName = assetDto.AssetName;
            existingAsset.AssetCode = assetDto.AssetCode;
            existingAsset.CategoryId = assetDto.CategoryId;
            existingAsset.Brand = assetDto.Brand;
            existingAsset.Model = assetDto.Model;
            existingAsset.Specification = assetDto.Specification;
            existingAsset.QuantityTotal = assetDto.QuantityTotal;
            _assetRepository.Update(existingAsset);
            await _assetRepository.SaveChangesAsync();
            return AssetMapper.ToDto(existingAsset);
        }
        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _assetRepository.GetByGuidAsync(id);
            if (entity == null)
                return false;
            if (!entity.IsActive)
                return false;
            entity.IsActive = false;
            _assetRepository.Update(entity);
            await _assetRepository.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<AssetDto>> GetAllAssetsAsync()
        {
            var assets = await _assetRepository.GetAllQueryable()
                 .Where(a => a.IsActive)
                .Include(a => a.Category)
                .ToListAsync();
            return assets.Select(AssetMapper.ToDto);
        }
    }
}
