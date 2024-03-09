namespace BE_BookingCamping.Models.Feedback
{
    public class FeedbackRequest
    {
        public string Description { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public int CustomerID { get; set; }
    }
}
