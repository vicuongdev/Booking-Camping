using BE_BookingCamping.Models.Feedback;

namespace BE_BookingCamping.Interface
{
    public interface IFeedbackRepository
    {
        FeedbackReponse CreateFeedback(FeedbackRequest request);
        FeedbackReponse UpdateFeedback(int feedbackID, FeedbackRequest request);
        bool DeleteFeedback(int feedbackID);

        List<FeedbackReponse> GetAllFeedbacks();
        FeedbackReponse GetFeedbackById(int feedbackID);
    }
}
