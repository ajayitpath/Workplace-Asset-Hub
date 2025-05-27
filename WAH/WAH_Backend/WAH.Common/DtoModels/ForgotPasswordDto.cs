using System.ComponentModel.DataAnnotations;

namespace WAH.Common.DtoModels
{
    public class ForgotPasswordDto
    {
        [Required(ErrorMessage = "Email is required.")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        [RegularExpression(@"^(?=.*@)(?=.*\.).+$",
        ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; } = string.Empty;
    }
}
