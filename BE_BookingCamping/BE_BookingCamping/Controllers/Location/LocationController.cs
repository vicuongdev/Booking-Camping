using BE_BookingCamping.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Location
{
    [Route("api/loacation")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        public ILocationRepository locationRepository;
        public LocationController(ILocationRepository _locationRepository)
        {
            locationRepository = _locationRepository;
        }

        [HttpGet("GetLocationNoBooked")]
        public IActionResult GetLocationNoBooked(DateTime dayCheckIn, DateTime dayCheckOut)
        {
            if (dayCheckIn < DateTime.Now)
            {
                return BadRequest("Ngày check-in phải lớn hơn ngày hiện tại");
            }
            if (dayCheckIn > dayCheckOut)
            {
                return BadRequest("Ngày check-in phải nhỏ hơn hoặc bằng ngày check-out");
            }
            var result = locationRepository.GetLocationsNoBooked(dayCheckIn, dayCheckOut);
            if(result == null)
            {
                return BadRequest("Chỗ cắm trại đã đầy, vui lòng chọn ngày khác");
            }
            return Ok(result);

        }

        [HttpGet("GetLocations")]
        public IActionResult GetLocation() 
        { 
            var result = locationRepository.GetLocactions();
            if(result == null)
            {
                return BadRequest("Lỗi");
            }
            return Ok(result);
        }
    }
}
