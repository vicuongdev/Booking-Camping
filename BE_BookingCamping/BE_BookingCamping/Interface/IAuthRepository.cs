using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Register;

namespace BE_BookingCamping.Interface
{
    public interface IAuthRepository
    {
        public Task<(bool Success, String errorMessage, RegisterResponse user1)> RegisterAsync(RegisterRequest request);
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt);
        public string CreateToken(UserReponse userReponse, int roleID);
        public RefreshToken GenerateRefreshToken();
        public User getUserByRefreshToken(string refreshToken);
        public User getUserByUserName(string userName);
    }
}
