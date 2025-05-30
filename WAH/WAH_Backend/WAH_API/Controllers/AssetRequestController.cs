using Microsoft.AspNetCore.Mvc;
using WAH.BLL.Interfaces;
using WAH.Common.DtoModels.AssetDtos;
using WAH.Common.Enums;

namespace WAH.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetRequestController : ControllerBase
    {
        private readonly IAssetRequestService _assetRequestService;

        public AssetRequestController(IAssetRequestService assetRequestService)
        {
            _assetRequestService = assetRequestService;
        }

        // POST: api/AssetRequest/create
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AssetRequestCreateDto requestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _assetRequestService.CreateRequestAsync(requestDto);
            return Ok(result);
        }

        // GET: api/AssetRequest/list
        [HttpGet("list")]
        public async Task<IActionResult> GetAll()
        {
            var requests = await _assetRequestService.GetAllRequestAsync();
            return Ok(requests);
        }

        // PUT: api/AssetRequest/update-status/{requestId}
        [HttpPut("update-status/{requestId}")]
        public async Task<IActionResult> UpdateStatus(Guid requestId, [FromQuery] string status)
        {
            if (!Enum.TryParse<RequestStatus>(status, true, out var parsedStatus))
                return BadRequest("Invalid status. Must be Pending, Approved, or Rejected.");

            var success = await _assetRequestService.UpdateStatusAsync(requestId, parsedStatus);
            if (!success)
                return NotFound("Request not found");

            return Ok("Status updated successfully");
        }
    }
}
