using WAH.Common.DtoModels.AssetDtos;

namespace WAH.BLL.Services.Interfaces.AssetInterfaces
{
    public interface IAssetService
    {
        Task<AssetDto> CreateAssetAsync(AssetDto assetDto);
        Task<AssetDto?> GetAssetByIdAsync(Guid assetId);
        Task<AssetDto?> UpdateAssetAsync(Guid assetId, AssetDto assetDto);
    }
}
