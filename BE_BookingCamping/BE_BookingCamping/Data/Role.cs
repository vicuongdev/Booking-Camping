using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_BookingCamping.Data
{
    public class Role
    {
        public int RoleID { get; set; }

        public string RoleName { get; set; }
        public virtual List<User>? Users { get; set; }
    }
}
