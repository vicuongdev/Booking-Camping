using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Register;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BE_BookingCamping.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IConfiguration _configuration;
        private readonly BookingCampingDbContext dbContext;
        public AuthRepository(IConfiguration configuration, BookingCampingDbContext _context)
        {
            _configuration = configuration;
            dbContext = _context;
        }

        public string CreateToken(UserReponse user, int RoleID)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, ((int)RoleID).ToString()),
        };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("JWTSettings:Key").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        public async Task<(bool Success, String errorMessage, RegisterResponse user1)> RegisterAsync(RegisterRequest request)
        {
            var user1 = getUserByUserName(request.UserName);
            if (user1 != null)
            {
                return (false, "UserName đã tồn tại!", null);
            }
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var user = new CreateUserCommand()
            {
                UserName = request.UserName,
                FullName = request.FullName,
                PasswordHash = passwordHash,
                PasswordSatl = passwordSalt,
                Image = request.Image,
                RoleID = request.RoleID,
                PhoneNumber = request.PhoneNumber,
            };
            var user2 = new User();
            user2.UserName = user.UserName;
            user2.PhoneNumber = user.PhoneNumber;
            user2.FullName = user.FullName;
            user2.PasswordHash = user.PasswordHash;
            user2.PasswordSatl = user.PasswordSatl;
            user2.Image = user.Image;
            user2.RoleID = user.RoleID;

           

            dbContext.Users.Add(user2);
            dbContext.SaveChanges();

            var result = getUserByUserName(user.UserName);

            var registerResponse = new RegisterResponse()
            {
                Id = result.UserID,
                UserName = result.UserName,
                FullName = result.FullName,
                Image = result.Image,
                PhoneNumber = result.PhoneNumber,
                Role = result.RoleID
            };

            if(result.RoleID == 1)
            {
                var admin = new Admin();
                admin.AdminID = result.UserID;
                admin.UserID = result.UserID;
                dbContext.Admins.Add(admin);
                dbContext.SaveChanges();
            } else if(result.RoleID == 2)
            {
                var employee = new Employee();
                employee.EmployeeID = result.UserID;
                employee.UserID = result.UserID;
                dbContext.Employees.Add(employee);
                dbContext.SaveChanges();
            } else if(result.RoleID == 3)
            {
                var customer = new Customer();
                customer.CustomerID = result.UserID;
                customer.UserID = result.UserID;
                dbContext.Customers.Add(customer);
                dbContext.SaveChanges();
            }

            return (true, null, registerResponse);
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

        public User getUserByRefreshToken(string refreshToken)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.RefreshToken == refreshToken);
            if (user == null)
            {
                return null;
            }
            else { return user; }
        }


        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }
}
