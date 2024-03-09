import React from "react";
import Navbar from "../components/_App/Navbar";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/_App/Footer";
import ProductList from "../components/Products/ProductList";

export default function ProductsPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Sản phẩm"
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText="Sản phẩm"
			/>

			<ProductList user={user} />

			<Footer />
		</>
	);
}
