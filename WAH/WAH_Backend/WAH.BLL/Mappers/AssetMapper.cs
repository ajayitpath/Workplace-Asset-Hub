using WAH.Common.DtoModels.AssetDtos;
using WAH.Common.Enums;
using WAH.DAL.EntityModels.AssetEntities;

namespace WAH.BLL.Mappers
{
    public static class AssetMapper
    {
        
            public static AssetEntity ToEntity(AssetDto dto)
            {
                return new AssetEntity
                {
                    AssetId = dto.AssetId,
                    AssetName = dto.AssetName,
                    AssetCode = dto.AssetCode,
                    CategoryId = dto.CategoryId,
                    Brand = dto.Brand,
                    Model = dto.Model,
                    Specification = dto.Specification,
                    QuantityTotal = dto.QuantityTotal
                };
            }

            public static AssetDto ToDto(AssetEntity entity)
            {
                return new AssetDto
                {
                    AssetId = entity.AssetId,
                    AssetName = entity.AssetName,
                    AssetCode = entity.AssetCode,
                    CategoryId = entity.CategoryId,
                    Brand = entity.Brand,
                    Model = entity.Model,
                    Specification = entity.Specification,
                    QuantityTotal = entity.QuantityTotal
                };
            }
        public static AssetRequestDto ToDto(AssetRequestEntity entity)
        {
            return new AssetRequestDto
            {
                RequestId = entity.RequestId,
                AssetId = entity.AssetId,
                AssetName = entity.Asset?.AssetName ?? string.Empty,
                UserId = entity.UserId,
                UserName = entity.User?.FirstName ?? string.Empty, // assuming FullName or similar
                QuantityRequested = entity.QuantityRequested,
                Status = entity.Status.ToString(),
                RequestedAt = entity.RequestedAt
            };
        }

        // AssetRequestCreateDto → AssetRequestEntity
        public static AssetRequestEntity ToEntity(AssetRequestCreateDto dto)
        {
            return new AssetRequestEntity
            {
                RequestId = Guid.NewGuid(),
                AssetId = dto.AssetId,
                UserId = dto.UserId,
                QuantityRequested = dto.QuantityRequested,
                Status = RequestStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };
        }
    }
}
