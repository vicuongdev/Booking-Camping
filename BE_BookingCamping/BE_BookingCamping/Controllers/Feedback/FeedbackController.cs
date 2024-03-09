using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Feedback;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Feedback
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackController(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        [HttpPost("CreateFeedback")]
        public async Task<IActionResult> CreateFeedback(FeedbackRequest request)
        {
            try
            {
                var feedbackRequest = new FeedbackRequest
                {
                    Description = request.Description,
                    Image1 = request.Image1,
                    Image2 = request.Image2,
                    Image3 = request.Image3,
                    CustomerID = request.CustomerID,
                };

                if (feedbackRequest == null)
                {
                    return BadRequest("Invalid data");
                }

                var feedbackResponse = _feedbackRepository.CreateFeedback(feedbackRequest);

                return CreatedAtAction(nameof(GetFeedbackById), new { id = feedbackResponse.FeedbackID }, feedbackResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public IActionResult GetFeedbackById(int id)
        {
            var feedbackResponse = _feedbackRepository.GetFeedbackById(id);

            if (feedbackResponse == null)
            {
                return NotFound();
            }

            return Ok(feedbackResponse);
        }


        [HttpDelete("DeleteFeedback")]
        public IActionResult DeleteFeedback(int id)
        {
            var existingFeedback = _feedbackRepository.GetFeedbackById(id);

            if (existingFeedback == null)
            {
                return NotFound();
            }
            var isDeleted = _feedbackRepository.DeleteFeedback(id);
            if (isDeleted)
            {
                return NoContent();
            }
            else
            {
                return StatusCode(500, "Xảy ra lỗi trong quá trình xóa");
            }
        }

        [HttpPut("EditFeedback")]
        public IActionResult UpdateFeedback(int id, [FromBody] FeedbackRequest feedbackRequest)
        {
            if (feedbackRequest == null)
            {
                return BadRequest("Invalid data");
            }

            var existingFeedback = _feedbackRepository.GetFeedbackById(id);

            if (existingFeedback == null)
            {
                return NotFound();
            }

            var updatedFeedback = _feedbackRepository.UpdateFeedback(id, feedbackRequest);

            if (updatedFeedback == null)
            {
                return StatusCode(500, "Xảy ra lỗi trong quá trình cập nhật Feedback");
            }
            return Ok(updatedFeedback);
        }

        [HttpDelete("DeleteAllFeedbacks")]
        public IActionResult DeleteAllFeedbacks()
        {
            try
            {
                var allFeedbacks = _feedbackRepository.GetAllFeedbacks();

                if (allFeedbacks == null || !allFeedbacks.Any())
                {
                    return NotFound("Không tìm thấy phản hồi để xóa.");
                }

                foreach (var feedback in allFeedbacks)
                {
                    var isDeleted = _feedbackRepository.DeleteFeedback(feedback.FeedbackID);

                    if (!isDeleted)
                    {
                        return StatusCode(500, $"Đã xảy ra lỗi khi xóa phản hồi có ID: {feedback.FeedbackID}");
                    }
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi khi xóa tất cả phản hồi: `{ex.Message}");
            }
        }

        [HttpGet("GetAllFeedbacks")]
        public IActionResult GetAllFeedbacks()
        {
            var feedbacks = _feedbackRepository.GetAllFeedbacks();
            return Ok(feedbacks);
        }
    }
}
