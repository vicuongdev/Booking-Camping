using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_BookingCamping.Data
{
    
    public class Category
    {
        
        public int CategoryID { get; set; }

        public string CategoryName { get; set; }
        public List<Product>? Products { get; set; }
    }
}
