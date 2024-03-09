namespace BE_BookingCamping.Models.CurrentUser
{
    public class CurrentUserResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public string PhoneNumber { get; set; }

        public string FullName { get; set; }

        public string Image { get; set; }

        public int Role { get; set; }
    }
}
