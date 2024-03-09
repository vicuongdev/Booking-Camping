using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Feedback;

namespace BE_BookingCamping.Repository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly BookingCampingDbContext dbContext;

        public FeedbackRepository(BookingCampingDbContext context)
        {
            dbContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public FeedbackReponse CreateFeedback(FeedbackRequest request)
        {
            if (request == null)
            {
                return null;
            }

            var feedback = new Feedback()
            {
                Description = request.Description,
                Image1 = request.Image1,
                Image2 = request.Image2,
                Image3 = request.Image3,
                CustomerID = request.CustomerID,
            };

            dbContext.Feedbacks.Add(feedback);
            dbContext.SaveChanges();

            return new FeedbackReponse()
            {
                FeedbackID = feedback.FeedbackID,
                Description = feedback.Description,
                Image1 = feedback.Image1,
                Image2 = feedback.Image2,
                Image3 = feedback.Image3,
                CustomerID = feedback.CustomerID,
            };
        }

        public bool DeleteFeedback(int feedbackID)
        {
            var existingFeedback = dbContext.Feedbacks.FirstOrDefault(f => f.FeedbackID == feedbackID);

            if (existingFeedback == null)
            {
                return false;
            }

            dbContext.Feedbacks.Remove(existingFeedback);
            dbContext.SaveChanges();
            return true;
        }


        public FeedbackReponse UpdateFeedback(int feedbackID, FeedbackRequest request)
        {
            var existingFeedback = dbContext.Feedbacks.FirstOrDefault(f => f.FeedbackID == feedbackID);

            if (existingFeedback == null || request == null)
            {
                return null;
            }

            existingFeedback.Description = request.Description;
            existingFeedback.Image1 = request.Image1;
            existingFeedback.Image2 = request.Image2;
            existingFeedback.Image3 = request.Image3;

            dbContext.SaveChanges();

            return new FeedbackReponse
            {
                FeedbackID = existingFeedback.FeedbackID,
                Description = existingFeedback.Description,
                Image1 = existingFeedback.Image1,
                Image2 = existingFeedback.Image2,
                Image3 = existingFeedback.Image3,
                CustomerID = existingFeedback.CustomerID,
            };
        }

        public List<FeedbackReponse> GetAllFeedbacks()
        {
            //var feedbacks = dbContext.Feedbacks
            //    .Select(f => new FeedbackReponse
            //    {
            //        FeedbackID = f.FeedbackID,
            //        Description = f.Description,
            //        Image1 = f.Image1,
            //        Image2 = f.Image2,
            //        Image3 = f.Image3,
            //        CustomerID = f.CustomerID,
            //    })
            //    .ToList();
            var feedbackWithCustomer = dbContext.Feedbacks
    .Join(
        dbContext.Customers,
        f => f.CustomerID,
        c => c.CustomerID,
        (f, c) => new FeedbackReponse
        {
            FeedbackID = f.FeedbackID,
            Description = f.Description,
            Image1 = f.Image1,
            Image2 = f.Image2,
            Image3 = f.Image3,
            CustomerID = f.CustomerID,
            CustomerFullName = dbContext.Users.FirstOrDefault(u => u.UserID == c.UserID) != null
                ? dbContext.Users.First(u => u.UserID == c.UserID).FullName
                : "Unknown"
        })
    .ToList();
            return feedbackWithCustomer;
        }

        public FeedbackReponse GetFeedbackById(int feedbackID)
        {
            var feedback = dbContext.Feedbacks
                .FirstOrDefault(f => f.FeedbackID == feedbackID);

            if (feedback == null)
            {
                return null;
            }

            return new FeedbackReponse
            {
                FeedbackID = feedback.FeedbackID,
                Description = feedback.Description,
                Image1 = feedback.Image1,
                Image2 = feedback.Image2,
                Image3 = feedback.Image3,
                CustomerID = feedback.CustomerID,
            };
        }
    }
}
