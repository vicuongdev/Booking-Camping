using BE_BookingCamping.Data;

namespace BE_BookingCamping.Models.Register
{
    public class UserReponse
    {
        public int UserID { get; set; }

        public string UserName { get; set; }

        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSatl { get; set; }

        public string RefreshToken { get; set; } = string.Empty;

        public DateTime? TokenCreatedAt { get; set; }

        public DateTime? TokenExpiresAt { get; set; }

        public string PhoneNumber { get; set; }

        public string FullName { get; set; }

        public string Image { get; set; }

        public int RoleID { get; set; }
    }
}
