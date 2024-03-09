import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/_App/Navbar";
import Footer from "../../components/_App/Footer";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import LoadingSpinner from "../../utils/LoadingSpinner";
import {baseUrl} from "../../utils/baseUrl";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";


const BasicInformation = ({user}) => {
	const { elarniv_users_token } = parseCookies();
	const [userUpdate, setUserUpdate] = useState(user ?? []);
	const [loading, setLoading] = React.useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const url = `${baseUrl}/api/users/update`;
			const data = { ...userUpdate };
			const payload = {
				headers: { Authorization: elarniv_users_token },
			};
			const response = await axios.put(url, data, payload);

			toast.success(response.data.message, {
				style: {
					border: "1px solid #4BB543",
					padding: "16px",
					color: "#4BB543",
				},
				iconTheme: {
					primary: "#4BB543",
					secondary: "#FFFAEE",
				},
			});
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<h2 className="fw-bold mb-4">Profile & Settings</h2>

					{/* <ul className="nav-style1">
						<li>
							<Link href="/profile/basic-information">
								<a className="active">Profile</a>
							</Link>
						</li>
						<li>
							<Link href="/profile/photo">
								<a>Profile Picture</a>
							</Link>
						</li>
					</ul> */}

					<div className="basic-profile-information-form">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label className="form-label fw-semibold">
											Họ và tên
										</label>
										<input
											type="text"
											className="form-control"
											name="fullName"
											value={userUpdate.fullName}
											onChange={handleChange}
										/>
									</div>

									<div className="form-group">
										<label className="form-label fw-semibold">
											Số điện thoại
										</label>
										<input
											type="tel"
											className="form-control"
											name="phoneNumber"
											value={userUpdate.phoneNumber}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className="col-md-6">
									<div className="form-group">
										<label className="form-label fw-semibold">
											Profile Image
										</label>
										<input
											type="file"
											className="form-control file-control"
											name="profilePhoto"
											accept="image/*"
											onChange={handleChange}
											required={true}
										/>
										<div className="form-text mt-2">
											Upload image size 200x200 pixels!
										</div>

										<div className="mt-3">
											{userUpdate.image ? (
											<img
												src={userUpdate.image}
												onError={({ currentTarget }) => {
													currentTarget.onerror = null; // prevents looping
													currentTarget.src="/images/avatar.jpg";
												  }}
												className="img-thumbnail mw-200px"
											/>
											) : (
											<img
												src="/images/avatar.jpg"
												alt="image"
												className="img-thumbnail mw-200px"
											/>
											)}
										</div>
									</div>
								</div>

								<div className="col-12">
									<button
										type="submit"
										className="btn default-btn"
									>
										<i className="flaticon-right-arrow"></i>
										Save <span></span>
										{loading ? <LoadingSpinner /> : ""}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	const options = {
// 		headers: {
// 		  Authorization: `Bearer ${Cookies.get("auth_token")}`,
// 		},
// 		withCredentials: true,
// 	  };
	
// 	const url = `${baseUrl}/api/auth/current-user`;
// 	const response = await axios.get(url, options);
// 	const user = response && response.data;
   
// 	// Pass data to the page via props
// 	return { props: { user } }
//   }

export default BasicInformation;
