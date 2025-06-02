using Microsoft.AspNetCore.Mvc;
using WAH.BLL.Services.Interfaces.AuthInterface;
using WAH.Common.DtoModels.AuthDtos;
using WAH.DAL.EntityModels.AuthEntities;
using WAH.DAL.Repositories.Interfaces;

namespace WAH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly IUserProfileService _profileService;
        private readonly IGenericRepository<UserProfileEntity> _profileRepo;
        public UserController(IUserService userService, IUserProfileService profileService,
            IGenericRepository<UserProfileEntity> profileRepo)
        {
            _userService = userService;
            _profileService = profileService;
            _profileRepo = profileRepo;
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
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> ResetPassword([FromForm] ResetPasswordDto dto)
=======
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto, [FromQuery] string token,
    [FromQuery] string email)
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
=======
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto, [FromQuery] string token,
    [FromQuery] string email)
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
        {
            if (dto.NewPassword != dto.ConfirmPassword)
                return BadRequest("Passwords do not match.");

            var result = await _userService.ResetPasswordAsync(dto, token, email);

            if (!result)
                return BadRequest("Invalid or expired token.");

            return Ok(new { message = "Password has been reset successfully." });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
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


        [HttpPost("upload/{userId}")]
      
        public async Task<IActionResult> Upload([FromRoute] Guid userId, [FromForm] UserProfileDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dto.UserId = userId;

            var imagePath = await _profileService.SaveProfileImageAsync(dto);

            // Check if user profile already exists
            var existing = (await _profileRepo.FindAsync(p => p.UserId == userId)).FirstOrDefault(); 
            if (existing != null)
            {
                existing.ProfileImage = imagePath;
                _profileRepo.Update(existing);
            }
            else
            {
                await _profileRepo.AddAsync(new UserProfileEntity
                {
                    UserId = userId,
                    ProfileImage = imagePath
                });
            }

            return Ok(new { message = "Profile image updated", imagePath });
        }

        [HttpPost("otp-verify")]
        public async Task<IActionResult> OtpVerify([FromBody] VerifyOtpDto dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Otp))
            {
                return BadRequest("Invalid OTP or email.");
            }

            var isValid = await _userService.VerifyOtpAsync(dto.Email,dto.Otp);
            if (!isValid)
            {
                return Unauthorized("Invalid OTP.");
            }

            return Ok(new { message = "OTP verified successfully." });
        }
    }
}
 