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
                var asset = await _assetService.GetAssetByIdAsync(id);
                if (asset == null)
                    return NotFound();

                return Ok(asset);
            }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsset(Guid id, [FromBody] AssetDto assetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedAsset = await _assetService.UpdateAssetAsync(id, assetDto);
            if (updatedAsset == null)
                return NotFound();

            return Ok(updatedAsset);
        }


    }
}
