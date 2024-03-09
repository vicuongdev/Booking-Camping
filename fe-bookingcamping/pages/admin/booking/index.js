import React, { useState, useEffect } from "react";
import Navbar from "../../../components/_App/Navbar";
import Footer from "../../../components/_App/Footer";
import AdminSideNav from "../../../components/_App/AdminSideNav";
import BookingRow from "../../../components/Admin/BookingRow";
import FilterByDateBooking from "../../../components/Admin/FilterByDateBooking";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import {baseUrl} from "../../../utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "../../../utils/GeneralLoader";
import { confirmAlert } from "react-confirm-alert";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";


const Index = ({ user }) => {
    const router = useRouter();
	// const users_token = "";
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(false);
    const day = router.query.day ? router.query.day : "";
    console.log("dayyy:" + day);
	const fetchData = async () => {
		setLoading(true);
		try {
            const payload = {
                params: {
                    day: day,
                },
            };
			const response = await axios.get(`${baseUrl}/api/booking/GetAllBooking`, payload);
			setBookings(response.data);
			setLoading(false);
		} catch (err) {
            setBookings([]);
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
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [day]);

	return (
		<>
			<Navbar user={user} />

			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-2 col-md-4">
							<AdminSideNav user={user} />
						</div>

						<div className="col-lg-10 col-md-8">
							<div className="main-content-box">
								{/* Nav */}
								<ul className="nav-style1">
									<li>
										<Link href="/admin/bookings/">
											<a className="active">Đặt chỗ</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/bookings/create/">
											<a>Create</a>
										</Link>
									</li>
								</ul>

								{loading ? (
									<GeneralLoader />
								) : (
                                    <>
                                    <FilterByDateBooking />
                                        <div className="table-responsive">
                                        
										<table className="table table-hover align-middle fs-14">
											<thead>
												<tr>
													<th scope="col">
														Họ tên
													</th>
													<th scope="col">
														Số điện thoại
													</th>
                                                    <th scope="col">
														Số lượng
													</th>
                                                    <th scope="col">
														Vị trí
													</th>
                                                    <th scope="col">
														Ngày check-in
													</th>
                                                    <th scope="col">
														Ngày check-out
													</th>
												</tr>
											</thead>
											<tbody>
												{bookings.length > 0 ? (
													bookings.map((booking) => (
														<BookingRow
															{...booking}
															key={booking.bookingID}
														/>
													))
												) : (
													<tr>
														<td
															colSpan="6"
															className="text-center py-3"
														>
															Empty!
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
                                    </>
									
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
