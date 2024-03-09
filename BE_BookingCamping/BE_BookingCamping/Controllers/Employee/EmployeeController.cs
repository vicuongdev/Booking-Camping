using BE_BookingCamping.Interface;
using BE_BookingCamping.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Employee
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository) 
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet("GetAllEmployee")]
        [Authorize(Roles = "1")]
        public IActionResult GetAllEmployee()
        {
            var result = _employeeRepository.GetAllEmployee();
            if (result == null)
            {
                return NotFound("Danh sách nhân viên trống");
            }
            return Ok(result);
        }

        [HttpDelete("DeleteEmployee")]
        [Authorize(Roles = "1")]
        public IActionResult DeleteEmployee(int employeeId)
        {
            var employee = _employeeRepository.GetEmployee(employeeId);
            if (employee == null)
            {
                return BadRequest(employeeId);
            }
            var result = _employeeRepository.DeleteEmployee(employeeId);
            if(result)
                return Ok("Xóa thành công");
            return BadRequest("Xóa thất bại");
        }
    }
}
