using System.ComponentModel.DataAnnotations;

namespace WAH_API.DTO
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required.")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        [RegularExpression(@"^(?=.*@)(?=.*\.).+$",
        ErrorMessage = "Email must contain '@' and '.' characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$",
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 and 100 characters.")]
        public string Password { get; set; } = string.Empty;

    }
}
