using System.Reflection;

namespace BE_BookingCamping.Data
{
    public class CampsiteCalendar
    {
        public int ID { get; set; }
        public int LocationID { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
        public Location? Location { get; set; }
    }
}
