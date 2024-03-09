using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    public class Customer
    {
        
        public int CustomerID { get; set; }

        public int UserID { get; set; }

        public User? User { get; set; }
        public List<Order>? Orders { get; set; }
        public List<Feedback>? Feedbacks { get; set; }
    }
}
