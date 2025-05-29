using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WAH.Common.DtoModels.AssetDtos;

namespace WAH.BLL.Services.Interfaces.AssetInterfaces
{
    public interface IAssetService
    {
        Task<AssetDto> CreateAssetAsync(AssetDto assetDto);
        Task<AssetDto?> GetAssetByIdAsync(Guid assetId);

    }
}
