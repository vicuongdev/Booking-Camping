using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Booking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Booking
{
    [Route("api/booking")]
    [ApiController]
    
    public class BookingController : ControllerBase
    {
        private IBookingRepository _bookingRepository;
        private IAuthRepository _authRepository;
        public BookingController(IBookingRepository bookingRepository, IAuthRepository authRepository)
        {
            _bookingRepository = bookingRepository;
            _authRepository = authRepository;
        }

        [HttpPost("CreateBooking")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> CreateBooking(BookingRequest request)
        {
            if(request.DayCheckIn <  DateTime.Now)
            {
                return BadRequest("Ngày check-in phải lớn hơn ngày hiện tại");
            }
            if(request.DayCheckIn > request.DayCheckOut)
            {
                return BadRequest("Ngày check-in phải nhỏ hơn ngày check-out");
            }

            var result = _bookingRepository.CreateBooking(request);

            return Ok(result);
        }

        [HttpGet("GetBookingByUser")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> GetBookingByUser()
        {
            var refreshToken = Request.Cookies["refreshtoken"];
            var user = _authRepository.getUserByRefreshToken(refreshToken);
            if (user == null)
            {
                return BadRequest(refreshToken);
            }
            if (user.TokenExpiresAt < DateTime.UtcNow)
            {
                return Unauthorized("Token hết hạn");
            }
            var listBooking = _bookingRepository.GetAllBookingByUser(user.UserID);
            if (listBooking == null)
            {
                return BadRequest("Người dùng chưa đặt chỗ");
            }
            return Ok(listBooking);
        }

        [HttpDelete("DeleteBooking")]
        [Authorize]
        public async Task<IActionResult> DeleteBooking(int bookingID)
        {
            var result = _bookingRepository.DeleteBooking(bookingID);
            if(result == false)
            {
                return BadRequest("Hủy đặt chỗ thất bại");
            }
            return Ok("Hủy đặt chỗ thành công");
        }

        [HttpPost("UpdateBooking")]
        [Authorize]
        public async Task<IActionResult> UpdateBooking(int bookingID, BookingRequest booking)
        {
            var result = _bookingRepository.UpdateBooking(bookingID, booking);
            if(result == false)
            {
                return BadRequest("Cập nhật đặt chỗ thất bại");
            }
            return Ok("Cập nhật thành công");
        }
        [HttpGet("GetAllBooking")]
        //[Authorize]
        public async Task<IActionResult> GetAllBooking(DateTime? day)
        {
            var list = _bookingRepository.GetAllBooking(day);
            if (list == null)
                return BadRequest("Danh sách đặt chỗ trống");
            return Ok(list);
        }
    }
}
