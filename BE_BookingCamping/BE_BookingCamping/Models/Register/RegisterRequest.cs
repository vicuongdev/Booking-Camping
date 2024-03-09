namespace BE_BookingCamping.Models.Register
{
    public class RegisterRequest
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string FullName { get; set; }

        public string Image { get; set; }
        public int RoleID { get; set; }

    }
}
