import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const ProductCard = ({
	productID,
    productName,
	productImage,
	price,
	capacity,
	Destription,
	categoryId,
    categoryName,
}) => {
	return (
		<div className="col-lg-4 col-md-6">
			<div className="single-courses-box">
				<div className="courses-image">
					<Link href={`/product/${productID}`}>
						<a className="d-block image">
							<img src={productImage} alt={productName} />
						</a>
					</Link>
					{/* <>
						
						<div className="price shadow">
							{new Intl.NumberFormat('vi-VN', {
												style: 'currency',
												currency: 'VND',
												}).format(price)}
						</div>
					</> */}
				</div>
				<div className="courses-content">
					

					<h3>
						<Link href={`/product/${productID}`}>
							{productName.length > 20 ? 
								<a productName={productName}>{productName.slice(0, 40)}...</a>
								:
								<a productName={productName}>{productName}</a>
							}
							
						</Link>
					</h3>

					
					<ul className="courses-box-footer d-flex justify-content-between align-items-center">
						<li>
							<i className="flaticon-agenda"></i> {new Intl.NumberFormat('vi-VN', {
												style: 'currency',
												currency: 'VND',
												}).format(price)}
						</li>
						{capacity && 
						<li>
							<i className="flaticon-people"></i>{" "}
							{capacity}
						</li>}

						
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
