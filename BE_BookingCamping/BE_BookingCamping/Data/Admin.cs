using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_BookingCamping.Data
{
    
    public class Admin
    {
        public int AdminID { get; set; }
        public int UserID { get; set; }
        public User? User { get; set; }
    }
}
