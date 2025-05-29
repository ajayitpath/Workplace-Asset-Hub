using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Org.BouncyCastle.Crypto;
using WAH.BLL.Mappers;
using WAH.BLL.Services.Interfaces.AssetInterfaces;
using WAH.Common.DtoModels.AssetDtos;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.Repositories.Implementations;
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
            var asset = await _assetRepository.GetById(id);
            if (asset == null)
                return null;
            var assetDto = AssetMapper.ToDto(asset);
            var category = await _assetcategoryRepository.GetById(asset.CategoryId);
            assetDto.CategoryId = category.CategoryId;
            return assetDto;
        }

    }
}
