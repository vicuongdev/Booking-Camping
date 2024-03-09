import React from "react";
import Navbar from "../components/_App/Navbar";
import PageBanner from "../components/Common/PageBanner"
import LoginForm from "../components/Authentication/LoginForm";
import Footer from "../components/_App/Footer";

export default function LoginPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Đăng nhập"
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText="Đăng nhập"
			/>

			<div className="profile-authentication-area ptb-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6 col-md-12">
							<LoginForm />
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
