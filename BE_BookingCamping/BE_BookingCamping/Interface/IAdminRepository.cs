using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Admin;

namespace BE_BookingCamping.Interface
{
    public interface IAdminRepository
    {
        public List<AdminReponse> GetAllAdmin();
        public bool BecomeAdmin(int employeeID);

    }
}
