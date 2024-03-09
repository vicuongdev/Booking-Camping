namespace BE_BookingCamping.Models.Product
{
    public class ProductResponse
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }

        public string ProductImage { get; set; }

        public decimal Price { get; set; }

        public string? Capacity { get; set; }

        public string Description { get; set; }


        public int CategoryID { get; set; }
    }
}
