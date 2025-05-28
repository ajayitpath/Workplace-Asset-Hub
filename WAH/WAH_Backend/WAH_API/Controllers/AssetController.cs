using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WAH.BLL.Services.Interfaces.AssetInterfaces;
using WAH.Common.DtoModels.AssetDtos;

namespace WAH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsset([FromBody] AssetDto assetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _assetService.CreateAssetAsync(assetDto);
            return CreatedAtAction(nameof(GetAssetById), new { id = result.AssetId }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssetById(Guid id)
        {
            //  Add logic to retrieve a single asset
            return Ok(); 
        }
    }
}
