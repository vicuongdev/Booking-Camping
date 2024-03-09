namespace BE_BookingCamping.Models.Booking
{
    public class BookingRequest
    {
        public int LocationID { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DayCheckIn { get; set; }
        public DateTime DayCheckOut { get; set; }
        public int Adult { get; set; }

        public int Children { get; set; }

        public int YoungChildren { get; set; }
        public int CustomerID { get; set; }
    }
}
