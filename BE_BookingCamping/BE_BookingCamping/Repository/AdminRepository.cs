using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Admin;

namespace BE_BookingCamping.Repository
{
    public class AdminRepository : IAdminRepository
    {
        public BookingCampingDbContext dbcontext;
        public AdminRepository(BookingCampingDbContext _context)
        {
            dbcontext = _context;
        }

        public bool BecomeAdmin(int employeeID)
        {
            var employee = dbcontext.Employees.FirstOrDefault(e => e.EmployeeID == employeeID);
            if (employee == null)
            {
                return false;
            }
            var accountOfEmployee = dbcontext.Users.FirstOrDefault(u => u.UserID == employee.UserID);
            if(accountOfEmployee == null)
            {
                return false;
            }
            dbcontext.Employees.Remove(employee);
            accountOfEmployee.RoleID = 1;
            dbcontext.Users.Update(accountOfEmployee);
            var admin = new Admin()
            {
                AdminID = accountOfEmployee.UserID,
                UserID = employee.UserID,
            };

            dbcontext.Admins.Add(admin);
            dbcontext.SaveChanges();
            return true;

            
        }

        public List<AdminReponse> GetAllAdmin()
        {
            var list = dbcontext.Admins.Join(dbcontext.Users,
                e => e.AdminID,
                u => u.UserID,
                (e, u) => new AdminReponse
                {
                    AdminID = e.AdminID,
                    AdminName = u.FullName,
                    Image = u.Image,
                    PhoneNumber = u.PhoneNumber,
                }).ToList();
            if (list is null)
            {
                return null;
            }
            return list;
        }
    }
}
