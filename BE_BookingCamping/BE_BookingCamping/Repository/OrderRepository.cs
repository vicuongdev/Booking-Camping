using BE_BookingCamping.Data;
using Microsoft.EntityFrameworkCore;

namespace BE_BookingCamping.Repository
{
    public class OrderRepository
    {
        public BookingCampingDbContext dbContext;
        public OrderRepository(BookingCampingDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public Order CreateOrder(string phoneNumber, int employeeID, int locationID)
        {
            var customer = dbContext.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);
            if (customer == null)
            {
                return null;
            }
            var order = dbContext.Orders.FirstOrDefault(o => o.CustomerID == customer.UserID && o.Status == false);
            if (order == null)
            {
                order = new Order();
                order.CustomerID = customer.UserID;
                order.CreateAt = DateTime.Now;
                order.EmployeeID = employeeID;
                order.Status = false;
                order.TotalPrice = 0;
                dbContext.Orders.Add(order);
                dbContext.SaveChanges();
                return order;
            };
            var orderdetails = dbContext.OrderDetails.FirstOrDefault(o => o.LocationID == locationID && o.OrderID == order.OrderID);

            var orderOld = dbContext.Orders.FirstOrDefault(o => o.OrderID == orderdetails.OrderID);

            return orderOld;
        }

        public bool DeleteOrder(int orderID)
        {
            var order = dbContext.Orders.Include(o => o.orderDetails)
                .FirstOrDefault(o => o.OrderID == orderID);
            if (order == null)
            {
                return false;
            }
            else
            {
                dbContext.OrderDetails.RemoveRange(order.orderDetails);
                dbContext.Orders.Remove(order);
                dbContext.SaveChanges();
                return true;
            }
        }
        //public void updateTotalPrice(int orderID)
        //{
        //    var order = dbContext.Orders.FirstOrDefault(o => o.)
        //}
    }
}
