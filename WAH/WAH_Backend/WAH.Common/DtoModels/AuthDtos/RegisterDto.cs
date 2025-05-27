using System.ComponentModel.DataAnnotations;
using WAH.Common.Enums;

namespace WAH.Common.DtoModels.AuthDtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [MaxLength(50, ErrorMessage = "First Name cannot exceed 50 characters.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required.")]
        [MaxLength(50, ErrorMessage = "Last Name cannot exceed 50 characters.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        [RegularExpression(@"^(?=.*@)(?=.*\.).+$",
        ErrorMessage = "Email must contain '@' and '.' characters.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone Number is required.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone Number must be 10 digits.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$",
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 and 100 characters.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Confirm Password must be between 6 and 100 characters.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$",
         ErrorMessage = "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 and 100 characters.")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string? ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        public Gender Gender { get; set; }

        //public IFormFile? profileImageUrl { get; set; }

        [MaxLength(20, ErrorMessage = "Desk number cannot exceed 20 characters.")]
        public string? DeskNo { get; set; }

        [Required(ErrorMessage = "Date of Birth is required.")]
        [DataType(DataType.Date)]
        [CustomValidation(typeof(RegisterDto), nameof(ValidateDOB))]
        public DateOnly DOB { get; set; }

        public static ValidationResult? ValidateDOB(DateOnly dob, ValidationContext context)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);

            if (dob > today)
                return new ValidationResult("Date of Birth cannot be in the future.");
            int age = today.Year - dob.Year;
            if (dob > today.AddYears(-age)) age--;

            if (age < 18)
                return new ValidationResult("You must be at least 18 years old.");
            return ValidationResult.Success;
        }


    }
}
