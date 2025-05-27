using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using WAH.Common.Enums;

namespace WAH.Common.DtoModels
{
    public class RegisterDto
    {
            [Required, MaxLength(50)]
            public string FirstName { get; set; }
            [Required, MaxLength(50)]
            public string LastName { get; set; }

            [Required, MaxLength(100), EmailAddress]
            public string Email { get; set; }

            [Required, MaxLength(15)]
            public string PhoneNumber { get; set; }

            [Required]
            public string Password { get; set; }

            [Required]
            [Compare("Password", ErrorMessage = "Passwords do not match.")]
            public string? ConfirmPassword { get; set; }

            public Gender Gender { get; set; }

            public IFormFile? profileImageUrl { get; set; }

            public string? DeskNo { get; set; }

            [Required]
            public DateTime DOB { get; set; }



    }
}
