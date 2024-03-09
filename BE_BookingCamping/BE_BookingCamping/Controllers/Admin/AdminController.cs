using BE_BookingCamping.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Admin
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public readonly IAdminRepository _AdminRepository;
        public AdminController(IAdminRepository AdminRepository)
        {
            _AdminRepository = AdminRepository;
        }

        [HttpGet("GetAllAdmin")]
        public IActionResult GetAllAdmin()
        {
            var result = _AdminRepository.GetAllAdmin();
            if (result == null)
            {
                return NotFound("Danh sách admin trống");
            }
            return Ok(result);
        }
        [HttpPut("BecomeAdmin/{emID}")]
        public IActionResult BecomeAdmin(int emID) 
        { 
            var isSuccess = _AdminRepository.BecomeAdmin(emID);
            if (isSuccess == false)
            {
                return BadRequest(emID);
            }
            return Ok("Trở thành admin thành công");
        }

    }
}
