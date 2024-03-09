namespace BE_BookingCamping.Models.Register
{
    public class CreateUserCommand
    {
        public string UserName { get; set; }

        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSatl { get; set; }

        public string PhoneNumber { get; set; }

        public string FullName { get; set; }

        public string Image { get; set; }

        public int RoleID { get; set; }
    }
}
