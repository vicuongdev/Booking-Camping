namespace BE_BookingCamping.Interface
{
    public interface ICampsiteCalendarRepository
    {
        public void updateLocationBooked(int locationID, DateTime dayCheckIn, DateTime dayCheckOut);
    }
}
