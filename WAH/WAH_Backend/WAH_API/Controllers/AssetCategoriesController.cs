using Microsoft.AspNetCore.Mvc;
using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels.AssetDtos;

namespace WAH.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetCategoriesController : ControllerBase
    {
        private readonly IAssetCategoryService _service;
        public AssetCategoriesController(IAssetCategoryService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound("Requested record not found");
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AssetCategoryDto dto)
        {
            try
            {
                var created = await _service.CreateCategory(dto);
                return Ok(created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] AssetCategoryDto dto)
        {
            if (id != dto.CategoryId) return BadRequest("This id is not registered");
            var updated = await _service.UpdateAsync(dto);
            if (!updated) return NotFound("Can not update");
            return Ok("Category updated");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return BadRequest("Couldn't delete");
            return Ok("Category deleted");
        }
    }
}
