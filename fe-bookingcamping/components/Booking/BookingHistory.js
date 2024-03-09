import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../utils/LoadingSpinner";
import {baseUrl} from "../../utils/baseUrl";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { confirmAlert } from "react-confirm-alert";

const BookingHistory = () => {
	const [bookings, setBookings] = useState([]);

	const fetchBookings = async () => {
		const options = {
			headers: {
			  Authorization: `Bearer ${Cookies.get("auth_token")}`,
			},
			withCredentials: true,
		};

		const url = `${baseUrl}/api/booking/GetBookingByUser`;
		const response = await axios.get(url,options);
		setBookings(response.data);
	};
	useEffect(() =>{
		fetchBookings();
	}, [])

	const confirmDelete = (bookingID) => {
		confirmAlert({
			title: "Xác nhận hủy",
			message:
				"Bạn có chắc chắn muốn hủy đặt chỗ?",
			buttons: [
				{
					label: "Có",
					onClick: () => handleDelete(bookingID),
				},
				{
					label: "Không",
				},
			],
		});
	};

	const handleDelete = async (bookingID) => {
		try {
			const payload = {
				headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` },
				params: { bookingID },
			};
			const response = await axios.delete(
				`${baseUrl}/api/booking/DeleteBooking`,
				payload
			);
			toast.success(response.data, {
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
			fetchBookings();
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
		} finally {
			fetchBookings();
		}
	};

	return (
		<>
			<div className="checkout-area ptb-100">
				<div className="container">
					<div className="row justify-content-center">
						{bookings.length > 0 ? bookings.map((booking) => (
							<div
							className="col-lg-9 col-md-12"
							key={booking.bookingID}
						>
							<div className="shopping-cart">
								<div className="shopping-cart-list">
									<div className="row align-items-center">
										<div className="col-lg-4">
											<div className="content">
												<h3>
													{booking.fullName}
												</h3>

												<p className="fs-14 mb-2">
													{booking.phoneNumber}
												</p>
												<p className="fs-14 mb-2">
                                                    Vị trí :{" "} {booking.locationName}
												</p>
                                                <p className="fs-14 mb-2">
                                                    Người lớn :{" "} {booking.adult}
												</p>
                                                <p className="fs-14 mb-2">
                                                    Trẻ em (6-10 tuổi) : {" "} {booking.children}
												</p>
                                                <p className="fs-14 mb-2">
                                                    Trẻ em dưới 6 tuổi: {" "} {booking.youngChildren}
												</p>
											</div>
										</div>

										<div className="col-lg-4 col-12">
											<div className="price d-flex justify-content-between justify-content-md-between text-center">
												<span className="fw-bolder fs-16">
                                                    Ngày check-in
												</span>{" "}
												<span className="fw-bolder fs-16 d-inline-block">
                                                    Ngày check-out
												</span>
											</div>
                                            <div className="price d-flex justify-content-between justify-content-md-between text-center">
												<span className="fw-bolder fs-16">
                                                    {/* {booking.dayCheckIn} */}
													{new Date(booking.dayCheckIn).toISOString().replace(/T.*/,'').split('-').reverse().join('-')}
												</span>{" "}
												<span className="fw-bolder fs-16 d-inline-block">
													{new Date(booking.dayCheckOut).toISOString().replace(/T.*/,'').split('-').reverse().join('-')}
												</span>
											</div>
										</div>
                                        <div className="col-lg-4 col-12">
											<div className="price text-center">
                                            <button
                                                onClick={() =>
													confirmDelete(
														booking.bookingID
													)}
                                                type="button"
                                                className="btn btn-danger btn-sm fs-12 px-4"
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm fs-12 ms-2"
                                            >
                                                Chỉnh sửa
                                            </button>
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
	);
};

export default BookingHistory;
