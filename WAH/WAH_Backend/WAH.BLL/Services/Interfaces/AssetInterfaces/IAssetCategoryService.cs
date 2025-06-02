using WAH.Common.DtoModels.AssetDtos;

namespace WAH.BLL.Services.Interfaces
{
    public interface IAssetCategoryService
    {
        Task<IEnumerable<AssetCategoryDto>> GetAllAsync();
        Task<AssetCategoryDto?> GetByIdAsync(Guid id);
        Task<bool> UpdateAsync(AssetCategoryDto dto);
        Task<bool> DeleteAsync(Guid id);
        Task<AssetCategoryDto> CreateCategory(AssetCategoryDto dto);
    }
}
