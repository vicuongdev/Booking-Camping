namespace BE_BookingCamping.Models.OrderDetails
{
    public class OrderDetailsRequest
    {
        public int OrderID { get; set; }

        public int ProductID { get; set; }
        public int LocationID { get; set; }

        public int Quantity { get; set; }
    }
}
