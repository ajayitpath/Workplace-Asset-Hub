using Microsoft.EntityFrameworkCore;
using WAH.BLL.Interfaces;
using WAH.BLL.Mappers;
using WAH.Common.DtoModels.AssetDtos;
using WAH.Common.Enums;
using WAH.DAL.EntityModels.AssetEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH.BLL.Services
{
    public class AssetRequestService : IAssetRequestService
    {
        private readonly IGenericRepository<AssetRequestEntity> _requestRepo;

        public AssetRequestService(IGenericRepository<AssetRequestEntity> requestRepo)
        {
            _requestRepo = requestRepo;
        }

        public async Task<IEnumerable<AssetRequestDto>> GetAllRequestAsync()
        {
            var requests = await _requestRepo.GetAllQueryable()
                .Include(r => r.Asset)
                .Include(r => r.User)
                .ToListAsync();

            return requests.Select(AssetMapper.ToDto);
        }

        public async Task<AssetRequestDto?> GetByIdAsync(Guid requestId)
        {
            var entity = await _requestRepo.GetAllQueryable()
                .Include(r => r.Asset)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.RequestId == requestId);

            return entity is not null ? AssetMapper.ToDto(entity) : null;
        }

        public async Task<AssetRequestDto> CreateRequestAsync(AssetRequestCreateDto dto)
        {
            var entity = AssetMapper.ToEntity(dto);
            await _requestRepo.AddAsync(entity);
            await _requestRepo.SaveChangesAsync();

            var fullEntity = await _requestRepo.GetAllQueryable()
                .Include(r => r.Asset)
                .Include(r => r.User)
                .FirstAsync(r => r.RequestId == entity.RequestId);

            return AssetMapper.ToDto(fullEntity);
        }

        public async Task<bool> UpdateStatusAsync(Guid requestId, RequestStatus newStatus)
        {
            var entity = await _requestRepo.GetByGuidAsync(requestId);
            if (entity is null) return false;

            entity.Status = newStatus;
            _requestRepo.Update(entity);
            await _requestRepo.SaveChangesAsync();
            return true;
        }

    }
}
