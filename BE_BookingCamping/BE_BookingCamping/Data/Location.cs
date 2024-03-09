using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class Location
    {
        public int LocationID { get; set; }
        public string LocationName { get; set; }
        public OrderDetail? orderDetail { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}
