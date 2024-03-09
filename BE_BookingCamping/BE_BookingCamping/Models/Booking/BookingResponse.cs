namespace BE_BookingCamping.Models.Booking
{
    public class BookingResponse
    {
        public int BookingID { get; set; }
        public DateTime? CreateAt { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }

        public int Adult { get; set; }

        public int Children { get; set; }

        public int YoungChildren { get; set; }

        public DateTime? DayCheckIn { get; set; }

        public DateTime? DayCheckOut { get; set; }

        public int CustomerID { get; set; }
        public string LocationName { get; set; }
    }
}
