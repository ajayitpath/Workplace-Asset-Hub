using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WAH.BLL.Services.Interfaces;
using WAH.Common.DtoModels;
using WAH_API.DTO;

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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var token = await _userService.LoginAsync(loginDto);
            if (token == null)
                return Unauthorized("Invalid email or password");

            return Ok(new { token }); 
            }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
            {
            var token = await _userService.ForgotPasswordAsync(dto);

            if (token == null)
                return NotFound("User not found.");

            return Ok(new { message = "Password reset token generated.", token = token });
            }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            if (dto.NewPassword != dto.ConfirmPassword)
                return BadRequest("Passwords do not match.");

            var result = await _userService.ResetPasswordAsync(dto);

            if (!result)
                return BadRequest("Invalid or expired token.");

            return Ok(new { message = "Password has been reset successfully." });
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
