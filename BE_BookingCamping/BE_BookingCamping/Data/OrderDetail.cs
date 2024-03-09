using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class OrderDetail
    {
        
        public int OrderDetailID { get; set; }
        
        public int OrderID { get; set; }
        
        public int ProductID { get; set; }
        public int LocationID { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }

        public Order? Order { get; set; }

        public Product? Product { get; set; }
        public Location? Location { get; set; }
    }
}
