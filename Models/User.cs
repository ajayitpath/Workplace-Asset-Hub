using System.ComponentModel.DataAnnotations;

namespace DemoChartProject.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedDT { get; set; }

        public DateTime? UpdatedDT { get; set; }

        public int RoleId { get; set; }

    }
}
