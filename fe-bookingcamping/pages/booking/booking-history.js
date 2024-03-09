import React from "react";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/_App/Footer";
import Link from "next/link";
import BookingHistory from "../../components/Booking/BookingHistory";

export default function BookingHistoryPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Lịch sử đặt chỗ"
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText="Lịch sử đặt chỗ"
			/>

            <BookingHistory/>


			<Footer />
		</>
	);
}
