using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Booking;

namespace BE_BookingCamping.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly BookingCampingDbContext dbContext;
        public BookingRepository(BookingCampingDbContext context)
        {
            dbContext = context;
        }
        public Booking GetBooking(int customerID, DateTime dayCheckIn, DateTime dayCheckOut, int locatinID) 
        {
            var b = dbContext.Bookings.FirstOrDefault(b => b.CustomerID == customerID
            && b.DayCheckIn == dayCheckIn
            && b.DayCheckOut == dayCheckOut
            && b.LocationID == locatinID);

            if (b == null)
            {
                return null;
            }
             return b;
        }

        public BookingResponse CreateBooking(BookingRequest request)
        {
            var booking = new Booking()
            {
                CreateAt = DateTime.Now,
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Adult = request.Adult,
                Children = request.Children,
                YoungChildren = request.YoungChildren,
                DayCheckIn = request.DayCheckIn,
                DayCheckOut = request.DayCheckOut,
                CustomerID = request.CustomerID,
                LocationID = request.LocationID,
            };
            dbContext.Bookings.Add(booking);
            dbContext.SaveChanges();

            updateLocationBooked(request.LocationID, request.DayCheckIn, request.DayCheckOut);

            var b = dbContext.Bookings.FirstOrDefault(b => b.CustomerID == request.CustomerID 
            && b.DayCheckIn == request.DayCheckIn
            && b.DayCheckOut == request.DayCheckOut
            && b.LocationID == request.LocationID);
            var c = GetBooking(request.CustomerID, request.DayCheckIn, request.DayCheckOut, request.LocationID);

            var locaton = dbContext.Locations.FirstOrDefault(l => l.LocationID == request.LocationID);

            return new BookingResponse()
            {
                BookingID = c.BookingID,
                CreateAt = booking.CreateAt,
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Adult = request.Adult,
                Children = request.Children,
                YoungChildren = request.YoungChildren,
                DayCheckIn = booking.DayCheckIn,
                DayCheckOut = booking.DayCheckOut,
                CustomerID = booking.CustomerID,
                LocationName = locaton.LocationName
            };
        }

        public bool DeleteBooking(int bookingID)
        {
            var booking = dbContext.Bookings.FirstOrDefault(b => b.BookingID == bookingID);
            if (booking == null)
            {
                return false;
            }

            deleteLocationBooked(booking.LocationID, booking.DayCheckIn, booking.DayCheckOut);

            dbContext.Bookings.Remove(booking);
            dbContext.SaveChanges();
            return true;
        }

        public List<BookingResponse> GetAllBookingByUser(int UserID)
        {
            var listBooking = dbContext.Bookings
                .Join(
                dbContext.Locations,
                b => b.LocationID,
                l => l.LocationID,
                (b, l) => new BookingResponse
                {
                    BookingID = b.BookingID,
                    CreateAt = b.CreateAt,
                    FullName = b.FullName,
                    PhoneNumber = b.PhoneNumber,
                    Adult = b.Adult,
                    Children = b.Children,
                    YoungChildren = b.YoungChildren,
                    DayCheckIn = b.DayCheckIn,
                    DayCheckOut = b.DayCheckOut,
                    CustomerID = b.CustomerID,
                    LocationName = l.LocationName,
                }).Where(b => b.CustomerID == UserID).ToList();

            if(listBooking == null)
            {
                return null;
            }
            return listBooking;
        }

        public bool UpdateBooking(int bookingID, BookingRequest request)
        {
            var booking = dbContext.Bookings.FirstOrDefault(b => b.BookingID == bookingID);
            if (booking == null)
            {
                return false;
            }
            booking.CreateAt = DateTime.Now;
            booking.FullName = request.FullName;
            booking.PhoneNumber = request.PhoneNumber;
            booking.Adult = request.Adult;
            booking.Children = request.Children;
            booking.YoungChildren = request.YoungChildren;
            booking.DayCheckIn = request.DayCheckIn;
            booking.DayCheckOut = request.DayCheckOut;
            booking.CustomerID = request.CustomerID;

            dbContext.Bookings.Update(booking);
            dbContext.SaveChanges();

            updateLocationBooked(request.LocationID, request.DayCheckIn, request.DayCheckOut);
            return true;
        }

        public void updateLocationBooked(int locationID, DateTime dayCheckIn, DateTime dayCheckOut)
        {
            
            for (DateTime ngayHienTai = dayCheckIn; ngayHienTai <= dayCheckOut; ngayHienTai = ngayHienTai.AddDays(1))
            {
                var locationBooked = new CampsiteCalendar()
                {
                    LocationID = locationID,
                    BookingDate = ngayHienTai,
                    Status = "Booked"
                };
                dbContext.CampsiteCalendars.Add(locationBooked);
                dbContext.SaveChanges();
            }
        }
        public void deleteLocationBooked(int locationID, DateTime dayCheckIn, DateTime dayCheckOut)
        {

            for (DateTime ngayHienTai = dayCheckIn; ngayHienTai <= dayCheckOut; ngayHienTai = ngayHienTai.AddDays(1))
            {
                var camsitcalendar = dbContext.CampsiteCalendars.FirstOrDefault(c => c.LocationID ==  locationID && c.BookingDate == ngayHienTai);
                if (camsitcalendar != null)
                {
                    dbContext.CampsiteCalendars.Remove(camsitcalendar);
                    dbContext.SaveChanges();
                }
            }
        }

        public List<Booking> GetAllBooking(DateTime? day)
        {
            if (day is null)
            {
                var list = dbContext.Bookings.Where(b => b.DayCheckIn >= DateTime.Now.Date).ToList();
                if(list.Count > 0)
                    return list;
                return null;
            }
            else
            {
                var listb = dbContext.Bookings.Where(b => b.DayCheckIn == day).ToList();
                if(listb.Count > 0) 
                    return listb;
                return null;
            }
        }

    }
}
