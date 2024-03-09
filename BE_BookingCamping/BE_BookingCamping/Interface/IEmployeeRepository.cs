using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Employee;

namespace BE_BookingCamping.Interface
{
    public interface IEmployeeRepository
    {
        public List<EmployeeResponse> GetAllEmployee();
        public Employee GetEmployee(int id);
        public EmployeeResponse GetEmployeeById(int id);
        public EmployeeResponse GetEmployeeByName(string name);
        public EmployeeResponse MakeEmployee(int userID);
        public bool DeleteEmployee(int enployeeID);

    }
}
