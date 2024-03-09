import React, { useState, useEffect } from "react";
import Navbar from "../../../components/_App/Navbar";
import Footer from "../../../components/_App/Footer";
import AdminSideNav from "../../../components/_App/AdminSideNav";
import EmployeeRow from "../../../components/Admin/EmployeeRow";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import {baseUrl} from "../../../utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "../../../utils/GeneralLoader";
import { confirmAlert } from "react-confirm-alert";
import Cookies from "js-cookie";


const Index = ({ user }) => {
	const users_token = "";
	const [employees, setEmployees] = useState([]);
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
			const response = await axios.get(`${baseUrl}/api/employee/GetAllEmployee`, options);
			setEmployees(response.data);
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

	const confirmDelete = (employeeID) => {
		confirmAlert({
			title: "Xác nhận xóa",
			message:
				"Bạn có muốn xóa nhân viên này ?",
			buttons: [
				{
					label: "Có",
					onClick: () => handleDelete(employeeID),
				},
				{
					label: "Không",
				},
			],
		});
	};

	const handleDelete = async (employeeID) => {
		try {
			const payload = {
				headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` },
				params: { employeeID },
			};
			const response = await axios.delete(
				`${baseUrl}/api/employee/DeleteEmployee`,
				payload,
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
			fetchData();
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
			fetchData();
		}

		// router.reload(`/admin/categories/`);
	};

	const handleAdmin = async (employeeID) => {
		try {
			const options = {
				headers: {
				  Authorization: `Bearer ${Cookies.get("auth_token")}`,
				},
				withCredentials: true,
			};
			const payload = {emID: employeeID };

			// const payloadData = { employeeID: employeeID };
			const response = await axios.put(`${baseUrl}/api/admin/BecomeAdmin/${employeeID}`,options);
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
			fetchData();
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
			fetchData();
		}
	};

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
											<a className="active">Nhân viên</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/employee/adminside/">
											<a>Admin</a>
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
														Mã nhân viên
													</th>
													<th scope="col">
														Tên nhân viên
													</th>
                                                    <th scope="col">
														Số điện thoại
													</th>
                                                    <th scope="col">
														Hình
													</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody>
												{employees.length > 0 ? (
													employees.map((em) => (
														<EmployeeRow
															{...em}
															key={em.employeeID}
															onDelete={() =>
																confirmDelete(
																	em.employeeID
																)
															}
															onAdmin={() =>
																handleAdmin(
																	em.employeeID
																)
															}
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

export default Index;
