import React, { useState, useEffect } from "react";
import Navbar from "../../../components/_App/Navbar";
import Footer from "../../../components/_App/Footer";
import AdminSideNav from "../../../components/_App/AdminSideNav";
import AdminRow from "../../../components/Admin/AdminRow";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import {baseUrl} from "../../../utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "../../../utils/GeneralLoader";
import { confirmAlert } from "react-confirm-alert";
import Cookies from "js-cookie";


const AdminSide = ({ user }) => {
	const users_token = "";
	const [admins, setAdmins] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const options = {
				headers: {
				  Authorization: `Bearer ${Cookies.get("auth_token")}`,
				},
				withCredentials: true,
			  };
			const response = await axios.get(`${baseUrl}/api/admin/GetAllAdmin`, options);
			setAdmins(response.data);
			setLoading(false);
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
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Navbar user={user} />

			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<AdminSideNav user={user} />
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								{/* Nav */}
								<ul className="nav-style1">
									<li>
										<Link href="/admin/employee/">
											<a>Nhân viên</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/employee/adminside/">
											<a className="active">Admin</a>
										</Link>
									</li>
								</ul>

								{loading ? (
									<GeneralLoader />
								) : (
									<div className="table-responsive">
										<table className="table table-hover align-middle fs-14">
											<thead>
												<tr>
													<th scope="col">
														Mã Admin
													</th>
													<th scope="col">
														Tên Admin
													</th>
                                                    <th scope="col">
														Số điện thoại
													</th>
                                                    <th scope="col">
														Hình
													</th>
												</tr>
											</thead>
											<tbody>
												{admins.length > 0 ? (
													admins.map((admin) => (
														<AdminRow
															{...admin}
															key={admin.adminID}
															
														/>
													))
												) : (
													<tr>
														<td
															colSpan="5"
															className="text-center py-3"
														>
															Empty!
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
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

export default AdminSide;
