using System.ComponentModel.DataAnnotations;

namespace WAH.Common.DtoModels.AssetDtos
{
    public class AssetDto
    {
        public Guid? AssetId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)] 
        public string AssetName { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 2)] 
        public string AssetCode { get; set; }

        [Required]
        public Guid CategoryId { get; set; }
        public string? CategoryName { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)] 
        public string Brand { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)] 
        public string Model { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)] 
        public string Specification { get; set; }

        [Required]
        public int QuantityTotal { get; set; }
    }
}
