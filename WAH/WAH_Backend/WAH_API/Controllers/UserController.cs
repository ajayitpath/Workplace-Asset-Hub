using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto, [FromQuery] string token,
    [FromQuery] string email)
        {
            if (dto.NewPassword != dto.ConfirmPassword)
                return BadRequest("Passwords do not match.");

            var result = await _userService.ResetPasswordAsync(dto, token, email);

            if (!result)
                return BadRequest("Invalid or expired token.");

            return Ok(new { message = "Password has been reset successfully." });
        }
        //[Authorize(Roles = "Admin,Manager")]
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
                return Ok(new { message = "Temporary User registered.Please Verify the OTP" });
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
        //[Authorize]
        public async Task<IActionResult> OtpVerify([FromBody] VerifyOtpDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Otp))
            {
                return BadRequest(new { message = "Email and OTP are required." });
            }

            try
            {
                var creatorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                Guid? creatorId = creatorIdClaim != null ? Guid.Parse(creatorIdClaim.Value) : null;

                var isValid = await _userService.VerifyOtpAsync(dto.Email, dto.Otp, creatorId);
                if (!isValid)
                {
                    return Unauthorized(new { message = "Invalid or expired OTP." });
                }

                return Ok(new { message = "OTP verified successfully. Registration complete." });
            }
            catch (Exception ex)
            {
                // Optional: log ex.Message
                return StatusCode(500, new { message = "Something went wrong during OTP verification." });
            }
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp([FromBody] ResendOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
            {
                return BadRequest(new { message = "Email is required." });
            }

            var result = await _userService.ResendOtpAsync(dto.Email);

            if (!result)
            {
                return NotFound(new { message = "No registration found for this email or already verified." });
            }

            return Ok(new { message = "OTP resent successfully." });
        }


    }
}
 