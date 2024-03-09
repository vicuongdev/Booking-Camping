using BE_BookingCamping.Services;
using Firebase.Storage;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly FirebaseStorageService _firebaseStorageService;
        public UploadController(FirebaseStorageService firebaseStorageService)
        {
            _firebaseStorageService = firebaseStorageService;
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("File is null or empty");
                }
                var fileName = file.FileName;

                using (var stream = file.OpenReadStream())
                {
                    var storage = _firebaseStorageService.GetFirebaseStorageInstance();
                    // Tải tệp lên Firebase Cloud Storage
                    var uploadTask = await storage.Child("uploads").Child(fileName).PutAsync(stream);
                    var downloadUrl = await storage.Child("uploads").Child(fileName).GetDownloadUrlAsync();

                    return Ok(new { FileName = fileName, DownloadUrl = downloadUrl });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
