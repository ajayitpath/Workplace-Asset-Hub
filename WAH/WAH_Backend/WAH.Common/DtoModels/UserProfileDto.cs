using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WAH.Common.DtoModels
{
    public class UserProfileDto
    {
        public Guid? UserId { get; set; }
        [Required(ErrorMessage = "Profile image is required.")]
        [DataType(DataType.Upload)]
        public IFormFile File { get; set; }
    }
}
