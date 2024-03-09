namespace BE_BookingCamping.Models.Tent
{
    public class TentResponse
    {
        public int TentID { get; set; }
        public string TentName { get; set; }
        public string Capacity { get; set; }
        public string Description { get; set; }
        public decimal PricePerNight { get; set; }
        public int LocationID { get; set; }
        public int ProductID { get; set; }
    }
}
