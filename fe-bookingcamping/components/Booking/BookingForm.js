import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../utils/LoadingSpinner";
import {baseUrl} from "../../utils/baseUrl";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";

const INITIAL_STATE = {
	fullName: "",
	phoneNumber: "",
	dayCheckIn: new Date().toISOString().split('T')[0],
	dayCheckOut: new Date().toISOString().split('T')[0],
  	adult: 0,
	locationID: 0,
	children: 0,
	youngChildren: 0,
	customerID: 0
};


const BookingForm = ({user}) => {
	const isCustomer = user.role == 3;
	
	const [booking, setBooking] = useState(INITIAL_STATE);
	const [location, setLocation] = useState([]);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!isFirstRender) {
		  // Perform actions (e.g., toast.error) only on subsequent renders
		  if (!isCustomer) {
			toast.error("Bạn đang dùng tài khoản của admin hoặc nhân viên nên không có quyền đặt chỗ", {
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
			router.push("/");
		  }
		} else {
		  setIsFirstRender(false);
		}
	  }, [isFirstRender, isCustomer, router]);



	React.useEffect(() => {
		const isContact = Object.values(booking).every((el) => el === 0 || Boolean(el));
		isContact ? setDisabled(false) : setDisabled(true);
	}, [booking]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBooking((prevState) => ({ ...prevState, [name]: value }));

		// handleUpdateLocation();
	};

	useEffect(() => {
		if (isFirstRender) {
			// Nếu là lần đầu tiên, không làm gì cả
			setIsFirstRender(false);
			return;
		}
		handleUpdateLocation();
	}, [booking]);
	
	const handleUpdateLocation = async (e) => {
		try {
			const payload = {
				params: {
					dayCheckIn : booking.dayCheckIn,
					dayCheckOut : booking.dayCheckOut
				}
			}

			const response = await axios.get(`${baseUrl}/api/loacation/GetLocationNoBooked`, payload);
			setLocation(response.data);
		} catch (err) {
			toast.error(err.response.data, {
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
			setLocation([]);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			booking.customerID = user.id;
			const url = `${baseUrl}/api/booking/CreateBooking`;
			const payload = { ...booking };
			console.log(Cookies.get("auth_token"));
			console.log(booking.customerID);

			const options = {
				headers: {
				  Authorization: `Bearer ${Cookies.get("auth_token")}`,
				},
				withCredentials: true,
			  };

			const response = await axios.post(url, payload, options);
			toast.success("Đặt chỗ thành công", {
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
			// setBooking(INITIAL_STATE);
			router.push("/booking/booking-history");
		} catch (err) {
			// toast.error(err., {
			// 	style: {
			// 		border: "1px solid #ff0033",
			// 		padding: "16px",
			// 		color: "#ff0033",
			// 	},
			// 	iconTheme: {
			// 		primary: "#ff0033",
			// 		secondary: "#FFFAEE",
			// 	},
			// });
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="contact-form">
				<h2>Form đặt chỗ</h2>
				<p>
					
				</p>

				<form id="contactForm" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Ngày check-in
								</label>
								<input
									type="date"
									name="dayCheckIn"
									value={booking.dayCheckIn}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Ngày check-out
								</label>
								<input
									type="date"
									name="dayCheckOut"
									value={booking.dayCheckOut}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="col-lg-12">
							<div className="form-group">
								<label className="form-label fw-semibold">
									Vị trí
								</label>
								<div className="col-lg-12">
                                    <div className="select-box">
                                        <select
                                            className="dropdown-booking form-select"
                                            name="locationID"
											value={booking.locationID}
											onChange={handleChange}
                                        >
											
												{location.map((l) => (
													<option key={l.locationID} value={l.locationID}>{l.locationName}</option>
												))}
											
                                        </select>
                                    </div>
                                </div>
							</div>
						</div>

						<div className="col-lg-12">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Người lớn
								</label>
								<input
									type="number"
									name="adult"
									min={1}
									value={booking.adult}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="col-lg-12">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Trẻ em (6-10 tuổi)
								</label>
								<input
									type="number"
									name="children"
									min={0}
									value={booking.children}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="col-lg-12">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Trẻ em dưới 6 tuổi
								</label>
								<input
									type="number"
									name="youngChildren"
									min={0}
									value={booking.youngChildren}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Họ tên
								</label>
								<input
									type="text"
									placeholder="Nhập họ tên"
									name="fullName"
									value={booking.fullName}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="form-label fw-semibold text-white">
									Số điện thoại
								</label>
								<input
									type="tel"
									name="phoneNumber"
									value={booking.phoneNumber}
									onChange={handleChange}
									placeholder="Nhập số điện thoại"
								/>
							</div>
						</div>

						

						<div className="col-lg-12 col-sm-12 text-center">
							<button
								type="submit"
								className="default-btn"
								disabled={disabled}
							>
								Đặt chỗ {loading ? <LoadingSpinner /> : ""}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default BookingForm;
