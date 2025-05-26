using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels;

namespace WAH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Consumes("multipart/form-data")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var result = await _userService.RegisterAsync(model);
            if (result)
            {
                return Ok(new { message = "User registered successfully" });
            }
            return StatusCode(500, "Failed to register user");
        }
    }
}
