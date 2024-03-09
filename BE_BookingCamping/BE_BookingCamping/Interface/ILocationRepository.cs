using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Location;

namespace BE_BookingCamping.Interface
{
    public interface ILocationRepository
    {
        public List<Location> GetLocationsBooked(DateTime dayCheckin, DateTime dayCheckout);
        public List<Location> GetLocationsBookedByDay(DateTime ngay);
        public List<Location> GetLocationsNotBookedByDay(DateTime ngay);
        public List<Location> GetLocationsNoBooked(DateTime dayCheckin, DateTime dayCheckout);
        public List<LocationStatus> GetLocactions();
    }
}
