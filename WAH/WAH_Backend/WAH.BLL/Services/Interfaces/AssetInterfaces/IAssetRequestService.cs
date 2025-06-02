using WAH.Common.DtoModels.AssetDtos;
using WAH.Common.Enums;

namespace WAH.BLL.Interfaces
{
    public interface IAssetRequestService
    {
        Task<IEnumerable<AssetRequestDto>> GetAllRequestAsync();
        Task<AssetRequestDto?> GetByIdAsync(Guid requestId);
        Task<AssetRequestDto> CreateRequestAsync(AssetRequestCreateDto dto);
        Task<bool> UpdateStatusAsync(Guid requestId, RequestStatus newStatus);

    }
}
