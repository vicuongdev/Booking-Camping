using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Register;

namespace BE_BookingCamping.Interface
{
    public interface IUserRepository
    {
        public User getUserById(int id);
        public User getUserByUserName(string userName);
        public User getUserByRefreshToken(string refreshToken);
        public User CreateUser(CreateUserCommand user);
    }
}
