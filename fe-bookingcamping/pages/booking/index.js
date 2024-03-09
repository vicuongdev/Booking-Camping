import React from "react";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/_App/Footer";
import GoogleMap from "../../components/Booking/GoogleMap";
import BookingForm from "../../components/Booking/BookingForm";
import CampingInfo from "../../components/Booking/CampingInfo";
import CampsiteMap from "../../components/Booking/CampsiteMap";

export default function BookingPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Đặt chỗ"
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText="Đặt chỗ"
			/>

            <div className="contact-area ptb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<CampingInfo />
							{/* <CampsiteMap/> */}
						</div>

						<div className="col-lg-6 col-md-12">
							<BookingForm user={user} />
						</div>
					</div>
				</div>
			</div>

            <GoogleMap />

			<Footer />
		</>
	);
}
