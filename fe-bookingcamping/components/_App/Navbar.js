import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ActiveLink from "../../utils/ActiveLink";
import ProfileDropdown from "./ProfileDropdown";
import SearchForm from "./SearchForm";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Navbar = ({ user }) => {
	const [menu, setMenu] = React.useState(true);
	const toggleNavbar = () => {
		setMenu(!menu);
	};
	

	React.useEffect(() => {
		let elementId = document.getElementById("navbar");
		document.addEventListener("scroll", () => {
			if (window.scrollY > 170) {
				elementId.classList.add("is-sticky");
			} else {
				elementId.classList.remove("is-sticky");
			}
		});
	});

	const classOne = menu
		? "collapse navbar-collapse"
		: "collapse navbar-collapse show";
	const classTwo = menu
		? "navbar-toggler navbar-toggler-right collapsed"
		: "navbar-toggler navbar-toggler-right";

	return (
		<>
			<div id="navbar" className="navbar-area">
				<div className="edemy-nav">
					<div className="container-fluid">
						<div className="navbar navbar-expand-lg navbar-light">
							<ActiveLink href="/">
								<a
									onClick={toggleNavbar}
									className="navbar-brand"
								>
									{/* <img src="/images/logo.png" alt="logo" /> */}
									<h6 className="logo-text">Mada Lakeview Camping</h6>
									
								</a>
							</ActiveLink>

							<button
								onClick={toggleNavbar}
								className={classTwo}
								type="button"
							>
								<span className="icon-bar top-bar"></span>
								<span className="icon-bar middle-bar"></span>
								<span className="icon-bar bottom-bar"></span>
							</button>

							<div
								className={classOne}
								id="navbarSupportedContent"
							>
								{/* <SearchForm /> */}

								<ul className="navbar-nav">
									<motion.li
										className="nav-item"
										whileHover={{
											scale: 1.1,
											transition: { duration: 0.5 },
										}}
										whileTap={{ scale: 0.9 }}
									>
										<ActiveLink href="/" activeClassName="active">
											<a
												onClick={toggleNavbar}
												className="nav-link"
											>
												Trang chủ
											</a>
										</ActiveLink>
									</motion.li>

									<motion.li
										className="nav-item"
										whileHover={{
											scale: 1.1,
											transition: { duration: 0.5 },
										}}
										whileTap={{ scale: 0.9 }}
									>
										<ActiveLink
											href="/booking"
											activeClassName="active"
										>
											<a
												onClick={toggleNavbar}
												className="nav-link"
											>
												Đặt chỗ
											</a>
										</ActiveLink>
									</motion.li>

									<motion.li
										className="nav-item"
										whileHover={{
											scale: 1.1,
											transition: { duration: 0.5 },
										}}
										whileTap={{ scale: 0.9 }}
									>
										<ActiveLink
											href="/product"
											activeClassName="active"
										>
											<a
												onClick={toggleNavbar}
												className="nav-link"
											>
												Sản phẩm
											</a>
										</ActiveLink>
									</motion.li>
									<motion.li
										className="nav-item"
										whileHover={{
											scale: 1.1,
											transition: { duration: 0.5 },
										}}
										whileTap={{ scale: 0.9 }}
									>
										<ActiveLink
											href="/feedback"
											activeClassName="active"
										>
											<a
												onClick={toggleNavbar}
												className="nav-link"
											>
												Đánh giá
											</a>
										</ActiveLink>
									</motion.li>
									
								</ul>
							</div>

							<div className="others-option d-flex align-items-center">
								

								<div className="option-item">
									{user ? (
										<ProfileDropdown {...user} />
									) : (
										<ActiveLink href="/login">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												Đăng nhập <span></span>
											</a>
										</ActiveLink>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
