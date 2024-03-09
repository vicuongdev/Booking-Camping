using BE_BookingCamping.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_BookingCamping.Data
{
    [Table("Tents")]
    public class Tent
    {
        [Key]
        public int TentID { get; set; }

        [Required]
        public string TentName { get; set; }

        [Required]
        public string Capacity { get; set; }


        [Required]
        public string Description { get; set; }

        [Required]
        public decimal PricePerNight { get; set; }

        [Required]
        public int LocationID { get; set; }

        [Required]
        public int ProductID { get; set; }

        // Navigation property to represent the relationship with Location
        [ForeignKey("LocationID")]
        public virtual Location Location { get; set; }

        // Navigation property to represent the relationship with Product
        [ForeignKey("ProductID")]
        public virtual Product Product { get; set; }
    }
}
