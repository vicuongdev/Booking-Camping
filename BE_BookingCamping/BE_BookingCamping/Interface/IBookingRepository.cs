using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Booking;

namespace BE_BookingCamping.Interface
{
    public interface IBookingRepository
    {
        public BookingResponse CreateBooking(BookingRequest request);
        public bool UpdateBooking(int bookingID, BookingRequest request);
        public bool DeleteBooking(int bookingID);
        public List<BookingResponse> GetAllBookingByUser(int UserID);
        public void updateLocationBooked(int locationID, DateTime dayCheckIn, DateTime dayCheckOut);
        public void deleteLocationBooked(int locationID, DateTime dayCheckIn, DateTime dayCheckOut);
        public List<Booking> GetAllBooking(DateTime? day);

    }
}
