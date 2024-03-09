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

const INIT_PRODUCT = {
    productName: "",
    productImage: "",
    price: 0,
    capacity: "",
    description: "",
    categoryID: 0
};

const Create = ({ user }) => {
	const router = useRouter();
	const [product, setProduct] = useState(INIT_PRODUCT);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = React.useState(false);
	const [disabled, setDisabled] = React.useState(true);
	const [imagePreview, setImagePreview] = React.useState("");

	React.useEffect(() => {
		const isProduct = Object.entries(product).every(([key, value]) => key === 'capacity' || (key !== 'capacity' && Boolean(value)));
		isProduct ? setDisabled(false) : setDisabled(true);
	}, [product]);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/category/GetAllCategory`);
			setCategories(response.data);
			setProduct((prevState) => ({
				...prevState,
				categoryID: response.data[0].categoryID,
			}));
			setLoading(false);
		} catch (err) {
			toast.error(err.message, {
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


	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "productImage") {
			const productImage = files[0].size / 1024 / 1024;
			if (productImage > 2) {
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
			setProduct((prevState) => ({
				...prevState,
				productImage: files[0],
			}));
			setImagePreview(window.URL.createObjectURL(files[0]));
            
		} else {
			setProduct((prevState) => ({ ...prevState, [name]: value }));
			console.log(product.categoryID);
		}
	};

	const handleImageUpload = async () => {
		const data = new FormData();
		data.append("file", product.productImage);
		let response;
        const url = `${baseUrl}/api/Upload/upload`;
		if (product.productImage) {
			response = await axios.post(url, data);
		}
		const imageUrl = response.data.downloadUrl;

		return imageUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let photo;
			if (product.productImage) {
				photo = await handleImageUpload();

				// photo = photo.replace(/^http:\/\//i, "https://");
			}
            const options = {
				headers: {
				  Authorization: `Bearer ${Cookies.get("auth_token")}`,
				},
				withCredentials: true,
			  };

			const url = `${baseUrl}/api/product/AddProduct`;
			const payload = { ...product, productImage: photo };
            console.log(payload);
			const response = await axios.post(url, payload, options);
			setLoading(false);

			toast.success("Thêm mới sản phẩm thành công", {
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
			router.push("/admin/products");
		} catch (err) {
            console.log(err.response.data);
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
										<Link href="/admin/products/">
											<a>Sản phẩm</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/products/create/">
											<a className="active">Create</a>
										</Link>
									</li>
								</ul>

								{/* Form */}
								<form onSubmit={handleSubmit}>
									<div className="row">
                                        <div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Danh mục
												</label>
												<div className="col-lg-4 col-md-6 ordering">
                                                    <div className="select-box">
                                                        <select
                                                            className="form-select"
                                                            name="categoryID"
															value={product.categoryID}
															onChange={handleChange}
                                                        >
															{categories.map((category)=>(
																<option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
															))}
                                                        </select>
                                                    </div>
                                                </div>
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Tên sản phẩm
												</label>
												<input
													type="text"
													className="form-control"
													name="productName"
													value={product.productName}
													onChange={handleChange}
													required={true}
												/>
											</div>
										</div>
                                        <div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Giá
												</label>
												<input
													type="text"
													className="form-control"
													name="price"
													value={product.price}
													onChange={handleChange}
													required={true}
												/>
											</div>
										</div>
                                        <div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Sức chứa
												</label>
												<input
													type="text"
													className="form-control"
													name="capacity"
													value={product.capacity}
													onChange={handleChange}
												/>
											</div>
										</div>

                                        <div className="col-md-12">
											<div className="form-group">
												<label className="form-label fw-semibold">
													Mô tả
												</label>
												<input
													type="text"
													className="form-control"
													name="description"
													value={product.description}
													onChange={handleChange}
													required={true}
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
													name="productImage"
													onChange={handleChange}
													required={true}
												/>
												<div className="form-text">
													Upload image size 750x500!
												</div>

												<div className="mt-2">
													{imagePreview ? (
														<img
															src={imagePreview}
															alt="image"
															className="img-thumbnail w-100px me-2"
														/>
													) : (
														<>
															<img
																src="/images/partner/partner1.png"
																alt="image"
																className="img-thumbnail w-100px me-2"
															/>
														</>
														
														
													)}
												</div>
											</div>
										</div>

										<div className="col-12">
											<button
												className="btn default-btn"
												type="submit"
												// disabled={disabled}
											>
												<i className="flaticon-right-arrow"></i>
												Save <span></span>
												{loading ? (
													<LoadingSpinner />
												) : (
													""
												)}
												<span></span>
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
