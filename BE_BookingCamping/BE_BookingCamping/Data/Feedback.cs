using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class Feedback
    {
        
        public int FeedbackID { get; set; }

        public string Description { get; set; }

        public string? Image1 { get; set; }

        public string? Image2 { get; set; }

        public string? Image3 { get; set; }

        public int CustomerID { get; set; }

        public Customer? Customer { get; set; }
    }
}
