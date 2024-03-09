
using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.CurrentUser;
using BE_BookingCamping.Models.Login;
using BE_BookingCamping.Models.RefreshToken;
using BE_BookingCamping.Models.Register;
using BE_BookingCamping.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Authentication
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IUserRepository _userRepository;
        private readonly BookingCampingDbContext dbContext;

        public AuthController(IAuthRepository authRepository, IUserRepository userRepository, BookingCampingDbContext dbContext)
        {
            _authRepository = authRepository;
            _userRepository = userRepository;
            this.dbContext = dbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest userRequest)
        {
            if (_userRepository.getUserByUserName(userRequest.UserName) != null)
            {
                return BadRequest("Username đã tồn tại!");
            }
            var result = await _authRepository.RegisterAsync(userRequest);
            if (result.Success)
                return Ok(result.user1);

            return BadRequest(result.errorMessage);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest userRequest)
        {
            var user = _authRepository.getUserByUserName(userRequest.UserName);
            if (user is null)
            {
                return BadRequest("Không tìm thấy tài khoản");
            }
            var userRespone = new UserReponse()
            {
                UserName = user.UserName,
                FullName = user.FullName,
                PasswordHash = user.PasswordHash,
                PasswordSatl = user.PasswordSatl,
                RefreshToken = user.RefreshToken,
                TokenCreatedAt = user.TokenCreatedAt,
                TokenExpiresAt = user.TokenExpiresAt,
                PhoneNumber = user.PhoneNumber,
                Image = user.Image,
                RoleID = user.RoleID

            };
            
            if(!_authRepository.VerifyPassword(userRequest.Password, user.PasswordHash!, user.PasswordSatl))
            {
                return BadRequest("Sai mật khẩu");
            }
            var token = _authRepository.CreateToken(userRespone, user.RoleID);
            var refreshToken = _authRepository.GenerateRefreshToken();
            SetRefreshToken(userRespone, refreshToken);
            var response = new LoginRespone
            {
                AccessToken = token,
                RefreshToken = refreshToken.Token
            };

            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest refreshTokenRequest)
        {
            var user = _authRepository.getUserByRefreshToken(refreshTokenRequest.RefreshToken);
            if (user is null)
            {
                return BadRequest("Không tìm thấy tài khoản");
            }
            var userRespone = new UserReponse()
            {
                UserName = user.UserName,
                FullName = user.FullName,
                PasswordHash = user.PasswordHash,
                PasswordSatl = user.PasswordSatl,
                RefreshToken = user.RefreshToken,
                TokenCreatedAt = user.TokenCreatedAt,
                TokenExpiresAt = user.TokenExpiresAt,
                PhoneNumber = user.PhoneNumber,
                Image = user.Image,
                RoleID = user.RoleID

            };
            
            if(user.TokenExpiresAt < DateTime.UtcNow)
            {
                return Unauthorized("Token đã hết hạn!");
            }

            var token = _authRepository.CreateToken(userRespone, user.RoleID);
            var newRefreshToken = _authRepository.GenerateRefreshToken();



            SetRefreshToken(userRespone, newRefreshToken);

            var response = new RefreshTokenRespone
            {
                AccessToken = token,
                RefreshToken = newRefreshToken.Token
            };

            return Ok(response);
        }

        [Authorize]
        [HttpGet("current-user")]
        [EnableCors("AllowSpecificOrigin")]
        public async Task<IActionResult> CurrentUser()
        {
            var refreshToken = Request.Cookies["refreshtoken"];
            var user = _authRepository.getUserByRefreshToken(refreshToken);
            if (user == null)
            {
                return BadRequest(refreshToken);
            }
            if(user.TokenExpiresAt < DateTime.UtcNow)
            {
                return Unauthorized("Token hết hạn");
            }
            var response = new CurrentUserResponse()
            {
                Id = user.UserID,
                UserName = user.UserName,
                FullName = user.FullName,
                Image = user.Image,
                PhoneNumber = user.PhoneNumber,
                Role = user.RoleID
            };
            return Ok(response);
        }

        private void SetRefreshToken(UserReponse userReponse,RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshtoken", newRefreshToken.Token, cookieOptions);
            var user = _userRepository.getUserByRefreshToken(userReponse.RefreshToken);
            if (user != null)
            {
                user.RefreshToken = newRefreshToken.Token;
                user.TokenCreatedAt = newRefreshToken.Created;
                user.TokenExpiresAt = newRefreshToken.Expires;
                dbContext.SaveChanges();
                
            }

        }

    }
}
