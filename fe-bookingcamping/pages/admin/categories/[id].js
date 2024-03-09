import React, { useState, useEffect } from "react";
import Navbar from "../../../components/_App/Navbar";
import Footer from "../../../components/_App/Footer";
import AdminSideNav from "../../../components/_App/AdminSideNav";
import Link from "next/link";
import axios from "axios";
import {baseUrl} from "../../../utils/baseUrl";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const INIT_CATE = {
    categoryID: 0,
    categoryName: ""
};

const Create = ({ user }) => {
	const router = useRouter();
	const [cat, setCat] = useState(INIT_CATE);
	const [loading, setLoading] = React.useState(false);
    const { id } = router.query;

	const handleChange = (e) => {
		setCat({ 
			categoryID: id,
			categoryName: e.target.value });
			console.log(cat);
	};

    useEffect(() => {
		const fetchCat = async () => {
			try {
				const url = `${baseUrl}/api/categories/GetCategoryById/${id}`;
				
				const response = await axios.get(url);
				setCat({ 
					categoryID: id,
					categoryName: response.data.categoryName });
			} catch (err) {
				console.log(err);
			}
		};

		fetchCat();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const url = `${baseUrl}/api/category/UpdateCategory`;
			const options = {
				headers: {
				  Authorization: `Bearer ${Cookies.get("auth_token")}`,
				},
				withCredentials: true,
			  };
			const payloadData = { ...cat };
			console.log(cat);
			const response = await axios.put(url, payloadData, options);
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
			router.push("/admin/categories");
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
											<a>Danh mục</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/categories/create/">
											<a>Create</a>
										</Link>
									</li>
                                    <li>
										<Link href={`/admin/categories/${id}/`}>
											<a className="active">Update</a>
										</Link>
									</li>
								</ul>

								{/* Form */}
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Tên danh mục
												</label>
												<input
													type="text"
													className="form-control"
													name="categoryName"
													value={cat.categoryName}
													onChange={handleChange}
													required={true}
												/>
											</div>
										</div>

										<div className="col-12">
											<button
												type="submit"
												className="default-btn"
											>
												<i className="flaticon-right-arrow"></i>
												Save <span></span>
												{loading ? (
													<LoadingSpinner />
												) : (
													""
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Create;
