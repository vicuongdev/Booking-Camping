import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LoadingSpinner from '../../utils/LoadingSpinner';
import Link from 'next/link';

const baseUrl = 'http://localhost:5164';

const INITIAL_STATE = {
  description: '',
  image1: '',
  image2: '',
  image3: '',
  customerID: 0,
};

const FeedbackForm = ({ user }) => {
  const router = useRouter();
  const [feedback, setFeedback] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [imagePreview1, setImagePreview1] = React.useState("");
  const [imagePreview2, setImagePreview2] = React.useState("");
  const [imagePreview3, setImagePreview3] = React.useState("");
    console.log(feedback.description);
  useEffect(() => {
    const isFeedback = Object.values(feedback).every((el) => el !== '');
    setDisabled(!isFeedback);
  }, [feedback]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // if (name.startsWith('image')) {
    //   const index = parseInt(name.replace('image', ''), 10);
    //   const image = files[0];

    //   setFeedback((prevState) => ({
    //     ...prevState,
    //     [name]: image,
    //   }));
    // } else {
    //   setFeedback((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    // }

    if (name === "image1") {
			const image1 = files[0].size / 1024 / 1024;
			if (image1 > 2) {
				toast.error(
					"The photo size greater than 2 MB. Make sure less than 2 MB.",
					{
						style: {
							border: "1px solid #ff0033",
							padding: "16px",
							color: "#ff0033",
						},
						iconTheme: {
							primary: "#ff0033",
							secondary: "#FFFAEE",
						},
					}
				);
				e.target.value = null;
				return;
			}
			setFeedback((prevState) => ({
				...prevState,
				image1: files[0],
			}));
			setImagePreview1(window.URL.createObjectURL(files[0]));
            
		} else if (name === "image2") {
			const image2 = files[0].size / 1024 / 1024;
			if (image2 > 2) {
				toast.error(
					"The photo size greater than 2 MB. Make sure less than 2 MB.",
					{
						style: {
							border: "1px solid #ff0033",
							padding: "16px",
							color: "#ff0033",
						},
						iconTheme: {
							primary: "#ff0033",
							secondary: "#FFFAEE",
						},
					}
				);
				e.target.value = null;
				return;
			}
			setFeedback((prevState) => ({
				...prevState,
				image2: files[0],
			}));
			setImagePreview2(window.URL.createObjectURL(files[0]));
            
		} else if (name === "image3") {
			const image3 = files[0].size / 1024 / 1024;
			if (image3 > 2) {
				toast.error(
					"The photo size greater than 2 MB. Make sure less than 2 MB.",
					{
						style: {
							border: "1px solid #ff0033",
							padding: "16px",
							color: "#ff0033",
						},
						iconTheme: {
							primary: "#ff0033",
							secondary: "#FFFAEE",
						},
					}
				);
				e.target.value = null;
				return;
			}
			setFeedback((prevState) => ({
				...prevState,
				image3: files[0],
			}));
			setImagePreview3(window.URL.createObjectURL(files[0]));
            
		}
    
    else {
			setFeedback((prevState) => ({ ...prevState, [name]: value }));
		}

  };

  const handleImageUpload = async (image) => {
    try {
      const data = new FormData();
      data.append('file', image);

      const url = `${baseUrl}/api/Upload/upload`;
      const response = await axios.post(url, data);
      return response.data.downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const imageUrls = await Promise.all(
        ['image1', 'image2', 'image3'].map(async (imageName) => {
          const image = feedback[imageName];
          return image ? await handleImageUpload(image) : null;
        })
      );
        feedback.customerID = user.id;
      const url = `${baseUrl}/api/Feedback/CreateFeedback`;
      const payload = {
        description: feedback.description,
        image1: imageUrls[0],
        image2: imageUrls[1],
        image3: imageUrls[2],
        customerID: feedback.customerID
      };

      const options = {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`,
        },
        withCredentials: true,
      };

      const response = await axios.post(url, payload, options);
      toast.success('Feedback submitted successfully', {
        style: {
          border: '1px solid #4BB543',
          padding: '16px',
          color: '#4BB543',
        },
        iconTheme: {
          primary: '#4BB543',
          secondary: '#FFFAEE',
        },
      });

      router.push('/feedback/');

      setFeedback(INITIAL_STATE);
    } catch (err) {
      let errorMessage = 'An error occurred while submitting feedback.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      toast.error(err.message, {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033',
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className="feedback-container">
      <h1 style={{ textAlign: 'center', color: '#333' }}>Feedback</h1>
      <div className="feedback-form">
        <label>
          Description:
          <input
            type="text"
            placeholder="Enter description"
            value={feedback.description}
            onChange={handleChange}
            name="description"
          />
        </label>

        {[1, 2, 3].map((index) => (
          <label key={index}>
            Image {index}:
            <input
              type="file"
              onChange={handleChange}
              name={`image${index}`}
            />
          </label>
        ))}


        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubmit}
            disabled={disabled}
          >
            {loading ? <LoadingSpinner /> : 'Submit Feedback'}
          </button>

          <Link href="/feedback/feedbacklist">
          <a>Go to Feedback List</a>
        </Link>
        </div>
      </div>
    </div> */}
    <div className="contact-form ">
				<h2>Đánh giá</h2>
				<p>
					
				</p>

				<form id="contactForm" onSubmit={handleSubmit}>
					<div className="row">
                        <div className="col-lg-12 col-md-12">
							<div className="form-group">
								<textarea
                             
									cols="30"
									rows="5"
									placeholder="Viết đánh giá của bạn..."
									name="description"
									value={feedback.description}
									onChange={handleChange}
								/>
							</div>
						</div>
                        <div className="col-md-12">
							<div className="form-group">
								<label className="form-label fw-semibold">
									Upload Image
								</label>
								<input
									type="file"
									className="form-control file-control"
									name="image1"
									onChange={handleChange}
								/>

								<div className="mt-2">
                                {imagePreview1 && 
                                    <img
                                        src={imagePreview1}
                                        alt="image1"
                                        className="img-thumbnail w-100px  me-2"
                                    />
                                }
							    </div>
                            
						    </div>
                        
					    </div>
						<div className="col-md-12">
							<div className="form-group">
								<label className="form-label fw-semibold">
									Upload Image
								</label>
								<input
									type="file"
									className="form-control file-control"
									name="image2"
									onChange={handleChange}
								/>
								<div className="mt-2">
                                {imagePreview2 && 
                                    <img
                                        src={imagePreview2}
                                        alt="image2"
                                        className="img-thumbnail w-100px  me-2"
                                    />
                                }
							    </div>
                            
						    </div>
                        
					    </div>
                        <div className="col-md-12">
							<div className="form-group">
								<label className="form-label fw-semibold">
									Upload Image
								</label>
								<input
									type="file"
									className="form-control file-control"
									name="image3"
									onChange={handleChange}
								/>
								<div className="mt-2">
                                {imagePreview3 && 
                                    <img
                                        src={imagePreview3}
                                        alt="image3"
                                        className="img-thumbnail w-100px  me-2"
                                    />
                                }
							    </div>
                            
						    </div>
                        
					    </div>
						

					<div className="col-lg-12 col-sm-12 text-center">
						<button
							type="submit"
							className="default-btn"
                            onClick={handleSubmit}
							// disabled={disabled}
						>
							Gửi đánh giá {loading ? <LoadingSpinner /> : ""}
						</button>
					</div>
					</div>
			</form>
		</div>
    </>
    
  );
};

export default FeedbackForm;
