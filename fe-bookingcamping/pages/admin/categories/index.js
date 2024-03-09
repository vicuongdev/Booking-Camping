import React, { useState, useEffect } from "react";
import Navbar from "../../../components/_App/Navbar";
import Footer from "../../../components/_App/Footer";
import AdminSideNav from "../../../components/_App/AdminSideNav";
import CategoryRow from "../../../components/Admin/CategoryRow";
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
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/category/GetAllCategory`);
			setCategories(response.data);
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

	const confirmDelete = (catId) => {
		confirmAlert({
			title: "Xác nhận xóa",
			message:
				"Bạn có chắc chắn muốn xóa danh mục này?",
			buttons: [
				{
					label: "Có",
					onClick: () => handleDelete(catId),
				},
				{
					label: "Không",
				},
			],
		});
	};

	const handleDelete = async (catId) => {
		try {
			const payload = {
				headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` },
				params: { catId },
			};
			const response = await axios.delete(
				`${baseUrl}/api/category/DeleteCategory`,
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
										<Link href="/admin/categories/">
											<a className="active">Categories</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/categories/create/">
											<a>Create</a>
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
														Mã danh mục
													</th>
													<th scope="col">
														Tên danh mục
													</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody>
												{categories.length > 0 ? (
													categories.map((cat) => (
														<CategoryRow
															{...cat}
															key={cat.categoryID}
															onDelete={() =>
																confirmDelete(
																	cat.categoryID
																)
															}
														/>
													))
												) : (
													<tr>
														<td
															colSpan="3"
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
