using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Employee;

namespace BE_BookingCamping.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public BookingCampingDbContext dbcontext;
        public EmployeeRepository(BookingCampingDbContext _context) 
        { 
            dbcontext = _context;
        }
        public bool DeleteEmployee(int employeeID)
        {
            var employee = dbcontext.Employees.FirstOrDefault(e => e.EmployeeID == employeeID);
            if(employee == null)
            {
                return false;
            }
            var user = dbcontext.Users.FirstOrDefault(u => u.UserID == employee.UserID);
            dbcontext.Employees.Remove(employee);
            dbcontext.SaveChanges();
            dbcontext.Users.Remove(user);
            dbcontext.SaveChanges();
            return true;
            
        }

        public List<EmployeeResponse> GetAllEmployee()
        {
            var list = dbcontext.Employees.Join(dbcontext.Users,
                e => e.EmployeeID, 
                u => u.UserID, 
                (e,u) => new EmployeeResponse
                {
                    EmployeeID = e.EmployeeID,
                    EmployeeName = u.FullName,
                    Image = u.Image,
                    PhoneNumber = u.PhoneNumber,
                }).ToList();
            if(list is null)
            {
                return null;
            }
            return list;
        }

        public Employee GetEmployee(int id)
        {
            var employee = dbcontext.Employees.FirstOrDefault(e => e.EmployeeID==id);
            if (employee == null)
                return null;
            return employee;
        }

        public EmployeeResponse GetEmployeeById(int id)
        {
            throw new NotImplementedException();
        }

        public EmployeeResponse GetEmployeeByName(string name)
        {
            throw new NotImplementedException();
        }

        public EmployeeResponse MakeEmployee(int userID)
        {
            throw new NotImplementedException();
        }
    }
}
