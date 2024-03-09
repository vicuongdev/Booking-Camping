using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class Booking
    {
        
        public int BookingID { get; set; }

        public DateTime? CreateAt { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }

        public int Adult { get; set; }

        public int Children { get; set; }

        public int YoungChildren { get; set; }

        public DateTime DayCheckIn { get; set; }

        public DateTime DayCheckOut { get; set; }
        public int LocationID { get; set; }

        public int CustomerID { get; set; }

        public Customer? Customer { get; set; }
        public Location? Location { get; set; }
    }
}
