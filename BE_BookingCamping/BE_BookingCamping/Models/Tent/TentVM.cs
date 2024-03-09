namespace BE_BookingCamping.Models.Tent
{
    public class TentVM
    {
        public string TentName { get; set; }
        public string Capacity { get; set; }
        public string Description { get; set; }
        public decimal PricePerNight { get; set; }
        public int LocationID { get; set; }
        public int ProductID { get; set; }
    }
}
