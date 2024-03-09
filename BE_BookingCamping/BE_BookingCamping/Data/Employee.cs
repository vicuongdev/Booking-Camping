using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    public class Employee
    {
        public int EmployeeID { get; set; }

        public int UserID { get; set; }

        public User? User { get; set; }
        public List<Order> Orders { get; set; }
    }
}
