import React, { useState, useEffect } from "react";
import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ProductCard from "../../components/Products/ProductCart";
import CategorySideNav from "../../components/_App/CategorySideNav";
import CourseSkeletonLoader from "../../utils/CourseSkeletonLoader";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/_App/Footer";

const ListProductByCategory = ({ user }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const {slug} = router.query;
	console.log(slug);

	const fetchProducts = async () => {
		setLoading(true);
		const response = await axios.get(`${baseUrl}/api/product/GetProductByCategory/${slug}`);
		setProducts(response.data);
		setLoading(false);
	};
	useEffect(() => {
		fetchProducts();
	},[slug]);

	

	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Sản phẩm"
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText="Sản phẩm"
			/>
			

			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<CategorySideNav user={user} />
						</div>
						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								<div className="courses-area courses-section pt-50 pb-100">
									<div className="container">
										{/* <ShortingDropdown /> */}
										<div className="row">
											{loading ? (
												<CourseSkeletonLoader />
											) : (
												<>
													{products.length > 0 ?
														products.map((product) => (
															<ProductCard
																key={product.id}
																{...product}
																
															/>
														)): "Không có sản phẩm"}
													
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ListProductByCategory;
