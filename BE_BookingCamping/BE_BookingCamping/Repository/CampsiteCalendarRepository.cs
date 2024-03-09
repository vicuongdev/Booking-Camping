using BE_BookingCamping.Data;

namespace BE_BookingCamping.Repository
{
    public class CampsiteCalendarRepository
    {
        public BookingCampingDbContext dbContext;
        public CampsiteCalendarRepository(BookingCampingDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public void updateLocationBooked(int locationID, DateTime dayCheckIn, DateTime dayCheckOut)
        {
            // Thêm từng ngày vào danh sách
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
    }
}
