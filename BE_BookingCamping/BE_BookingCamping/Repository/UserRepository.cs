using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Register;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly BookingCampingDbContext dbContext;
        public UserRepository(BookingCampingDbContext _context)
        { 
            dbContext = _context;
        }
        public User getUserById(int id)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.UserID == id);
            if (user == null)
            {
                return null;
            }
            else
            {
                return user;
            }
        }

        public User getUserByRefreshToken(string refreshToken)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.RefreshToken == refreshToken);
            if (user == null)
            {
                return null;
            } 
            else 
            { 
                return user; 
            }
        }

        public User getUserByUserName(string userName)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null)
            {
                return null;
            }
            else { return user; }
        }
        public User CreateUser(CreateUserCommand userCommand)

        {
            var user = getUserByUserName(userCommand.UserName);
            if (user != null) 
            {
                throw new ArgumentNullException("UserName đã tồn tại");
            } else
            {
                var user1 = new User();
                user1.UserName = userCommand.UserName;
                user1.PhoneNumber = userCommand.PhoneNumber;
                user1.FullName = userCommand.FullName;
                user1.PasswordHash = userCommand.PasswordHash;
                user1.PasswordSatl = userCommand.PasswordSatl;
                user1.Image = userCommand.Image;
                user1.RoleID = userCommand.RoleID;

                dbContext.Users.Add(user1);
                dbContext.SaveChanges();

                var result = getUserByUserName(user1.UserName);


                return result;
                
            }
        }
    }
}
