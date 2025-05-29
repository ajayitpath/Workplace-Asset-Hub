using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WAH.Common.DtoModels.AssetDtos;
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
                    // We do not map navigation properties from DTO
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
                    // We do not include navigation properties in DTO
                };
            }
        }
}
