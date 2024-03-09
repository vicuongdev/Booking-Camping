using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class Product
    {
        
        public int ProductID { get; set; }
        
        public string ProductName { get; set; }

        public string ProductImage { get; set; }

        public decimal Price { get; set; }

        
        public string? Capacity { get; set; }

        public string Description { get; set; }

        
        public int CategoryID { get; set; }

        public Category? Category { get; set; }
        public List<OrderDetail>? orderDetails { get; set; }
    }
}
