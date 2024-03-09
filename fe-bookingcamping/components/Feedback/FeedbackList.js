import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoadingSpinner from '../../utils/LoadingSpinner';
import {baseUrl} from "../../utils/baseUrl";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const url = `${baseUrl}/api/Feedback/GetAllFeedbacks`;
        const response = await axios.get(url);

        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
    {/* <div className="feedback-list">
      <h2>Feedback List</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.feedbackID}>
              <strong>Feedback ID:</strong> {feedback.feedbackID}
              <br />
              <strong>Description:</strong> {feedback.description}
              <br />
              <strong>Images:</strong>
              <ul>
                {feedback.image1 && <li><img src={feedback.image1} alt="Image 1" /></li>}
                {feedback.image2 && <li><img src={feedback.image2} alt="Image 2" /></li>}
                {feedback.image3 && <li><img src={feedback.image3} alt="Image 3" /></li>}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div> */}

<>

			<div className="checkout-area ptb-100">
				<div className="container">
					<div className="row justify-content-center">
                        <div className="col-lg-9 col-md-12">
                            <div className="courses-price d-flex justify-content-end pb-3">
                                    <button
                                        onClick={() => router.push("/feedback/createfeedback")}
                                        className="default-btn"
                                    >
                                    <i className="flaticon-right-arrow"></i> Viết đánh giá
                                </button>
                            </div>
                        </div>
						{feedbacks.length > 0 ? feedbacks.map((feedback) => (
							<div
							className="col-lg-9 col-md-12"
							// key={booking.bookingID}
						>
							<div className="shopping-cart">
								<div className="shopping-cart-list">
									<div className="row align-items-center">
										<div className="col-lg-12">
											<div className="content">
												<h3>
													{feedback.customerFullName}
												</h3>

												<p className="fs-14 mb-2">
													{feedback.description}
												</p>
                                                {feedback.image1 && 
                                                    <img
													src={feedback.image1}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src="/images/avatar.jpg";
                                                      }}
													alt="image"
													className="img-thumbnail w-100px me-2"
												/>
                                                }
                                                {feedback.image2 && 
                                                    <img
													src={feedback.image2}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src="/images/avatar.jpg";
                                                      }}
													alt="image"
													className="img-thumbnail w-100px me-2"
												/>
                                                }
                                                {feedback.image3 && 
                                                    <img
													src={feedback.image3}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src="/images/avatar.jpg";
                                                      }}
													alt="image"
													className="img-thumbnail w-100px me-2"
												/>
                                                }

											</div>
										</div>

										
                                        
									</div>
								</div>
							</div>
						</div>
						))
						: "Lịch sử đặt chỗ trống"
						}
						
					</div>
				</div>
			</div>
		</>
    </>
  );
};

export default FeedbackList;
