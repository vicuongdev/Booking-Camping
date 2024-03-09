using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Location;
using System.Linq;

namespace BE_BookingCamping.Repository
{
    public class Locationrepository : ILocationRepository
    {
        public BookingCampingDbContext dbContext;
        public Locationrepository(BookingCampingDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public List<Location> GetLocationsBooked(DateTime dayCheckin, DateTime dayCheckout)
        {
            List<DateTime> danhSachNgay = new List<DateTime>();
            var listLocation = new List<Location>();

            // Thêm từng ngày vào danh sách
            for (DateTime ngayHienTai = dayCheckin; ngayHienTai <= dayCheckout; ngayHienTai = ngayHienTai.AddDays(1))
            {
                var listLocationByDate = new List<Location>();
                listLocationByDate = GetLocationsBookedByDay(ngayHienTai);
                if(listLocationByDate.Count > 0 )
                    listLocation = (List<Location>)listLocation.Concat(listLocationByDate);
            }
            if(listLocation.Count > 0 )
            {
                return listLocation;
            }

            return null;
        }

        public List<Location> GetLocationsBookedByDay(DateTime ngay)
        {
            var locations = dbContext.CampsiteCalendars
            .Where(p => p.BookingDate.Date == ngay.Date)
            .Join(
                dbContext.Locations,
                campsite => campsite.LocationID,
                location => location.LocationID,
                (campsite, location) => new Location
                {
                    LocationID = location.LocationID,
                    LocationName = location.LocationName
                }
            ).ToList();
            if (locations.Count < 0)
                return null;
            return locations;
        }

        public List<Location> GetLocationsNotBookedByDay(DateTime ngay)
        {
            var bookedLocations = dbContext.CampsiteCalendars
                .Where(p => p.BookingDate.Date == ngay.Date)
                .Select(p => p.LocationID)
                .ToList();
            if(bookedLocations.Count < 0)
            {
                return dbContext.Locations.ToList();
            }

            var resultLocations = dbContext.Locations
                .Where(location => !bookedLocations.Contains(location.LocationID))
                .ToList();
            if (resultLocations.Count < 0)
                return null;

            return resultLocations;
        }

        public List<Location> GetLocationsNoBooked(DateTime dayCheckin, DateTime dayCheckout)
        {
            List<DateTime> danhSachNgay = new List<DateTime>();
            var listLocations = new List<List<Location>>();

            for (DateTime ngayHienTai = dayCheckin; ngayHienTai <= dayCheckout; ngayHienTai = ngayHienTai.AddDays(1))
            {
                var listLocationByDate = new List<Location>();
                listLocationByDate = GetLocationsNotBookedByDay(ngayHienTai);
                if(listLocationByDate.Count > 0)
                    listLocations.Add(listLocationByDate);
            }
            if(listLocations.Count < 0)
            {
                return null;
            };
            var commonLocations = listLocations
            .Skip(1) // Bỏ qua danh sách đầu tiên để so sánh với các danh sách còn lại.
            .Aggregate(
                new HashSet<Location>(listLocations.First()), // Sử dụng HashSet cho hiệu suất tốt hơn.
                (common, current) => { common.IntersectWith(current); return common; }
            ).ToList();

            if(commonLocations.Count > 0)
                return commonLocations;

            return null;
        }

        public List<LocationStatus> GetLocactions()
        {
            var result = dbContext.Locations
            .Select(location => new LocationStatus
            {
                LocationID = location.LocationID,
                LocationName = location.LocationName,
                status = dbContext.CampsiteCalendars
                    .Where(calendar => calendar.LocationID == location.LocationID)
                    .Select(calendar => calendar.Status)
                    .FirstOrDefault() ?? "free"
            })
            .ToList();
            if(result == null)
            {
                return null;
            }

            return result;
        }
    }
}
