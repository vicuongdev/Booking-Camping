using BE_BookingCamping.Data;
using BE_BookingCamping.Models.OrderDetails;

namespace BE_BookingCamping.Repository
{
    public class OrderDetailsRepository
    {
        public BookingCampingDbContext dbContext;
        public OrderDetailsRepository(BookingCampingDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public void AddProductIntoOrder(OrderDetailsRequest request)
        {
            var orderDetail = dbContext.OrderDetails.FirstOrDefault(o => o.ProductID == request.ProductID &&  o.OrderID == request.OrderID && o.LocationID == request.LocationID);
            if(orderDetail == null)
            {
                orderDetail = new OrderDetail();
                orderDetail.ProductID = request.ProductID;
                orderDetail.OrderID = request.OrderID;
                orderDetail.LocationID = request.LocationID;
                orderDetail.Quantity = request.Quantity;
                var product = dbContext.Products.FirstOrDefault(p => p.ProductID == request.ProductID);
                orderDetail.TotalPrice = request.Quantity * product.Price;
                dbContext.OrderDetails.Add(orderDetail);
                dbContext.SaveChanges();
            }
            else
            {
                orderDetail.Quantity += 1;
                dbContext.OrderDetails.Update(orderDetail);
                dbContext.SaveChanges();
            }
        }

        public void RemoveProductFromOrder(int  productID, int orderID)
        {
            var orderDetails = dbContext.OrderDetails.FirstOrDefault(o => o.ProductID == productID && o.OrderID == orderID);
            if (orderDetails == null) { return; }
            dbContext.OrderDetails.Remove(orderDetails);
            dbContext.SaveChanges();
        }
    }
}
