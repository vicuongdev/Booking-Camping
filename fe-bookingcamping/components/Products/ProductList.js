import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Pagination from "@etchteam/next-pagination";
import ProductCard from "./ProductCart";
import ShortingDropdown from "./ShortingDropdown";
import CategorySideNav from "../_App/CategorySideNav";
import CourseSkeletonLoader from "../../utils/CourseSkeletonLoader";

const ProductList = ({ user }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	// const [pages, setPages] = useState(0);
	// const [coursesCount, setCoursesCount] = useState(0);
	const router = useRouter();
	// const page = router.query.page ? router.query.page : "1";
	// const size = router.query.size ? router.query.size : "9";
	// const short = router.query.short ? router.query.short : "";
	// const search = router.query.search ? router.query.search : "";

	const fetchProducts = async () => {
		setLoading(true);

		const response = await axios.get(`${baseUrl}/api/product/GetAllProduct`);
		setProducts(response.data);
		// console.log(response.data);
		setLoading(false);
	};
	useEffect(() => {
		fetchProducts();
	}, []);

	

	return (
		<>
			

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
													{products &&
														products.map((product) => (
															<ProductCard
																key={product.id}
																{...product}
																
															/>
														))}
													{/* {coursesCount > 9 && (
														<div className="col-lg-12 col-md-12">
															<div className="pagination-area text-center">
																<Pagination
																	sizes={[1]}
																	total={pages}
																/>
															</div>
														</div>
													)} */}
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
		</>
	);
};

export default ProductList;
