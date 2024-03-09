using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class Order
    {
        
        public int OrderID { get; set; }

        public DateTime CreateAt { get; set; }
        
        public int? CustomerID { get; set; }

        public int? EmployeeID { get; set; }

        public decimal TotalPrice { get; set; }

        public bool? Status { get; set; }

        public Customer Customer { get; set; }

        public Employee  Employee { get; set; }
        public List<OrderDetail>? orderDetails { get; set; }
    }
}
