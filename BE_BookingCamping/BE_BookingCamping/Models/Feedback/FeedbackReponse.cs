namespace BE_BookingCamping.Models.Feedback
{
    public class FeedbackReponse
    {
        public int FeedbackID { get; set; }
        public string Description { get; set; }

        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public int CustomerID { get; set; }
        public string CustomerFullName { get; set; }
    }
}
