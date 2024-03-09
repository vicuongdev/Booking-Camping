import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import StickyBox from "react-sticky-box";
import { motion } from "framer-motion";

const Initial = {
	fullName: "",
	id: 1 ,
	image: "",
	phoneNumber: "",
	role: 1,
	userName: "",
}

const AdminSideNav = ({ user }) => {
	// const user2 = useSelector((state) => state.auth.currentUser);
	// const [user1, setUser1] = useState(Initial);
	const router = useRouter();
	const isAdmin = user.role == 1;
	const currentRoute = router.pathname;
	useEffect(() => {
		
		if (!isAdmin) {
			router.replace("/");
		}
	}, [user]);

	// Sidebar Nav
	const [isActiveSidebarNav, setActiveSidebarNav] = useState("false");
	const handleToggleSidebarNav = () => {
		setActiveSidebarNav(!isActiveSidebarNav);
	};

	return (
		<>
			{/* For mobile device */}
			<div className="text-end d-md-none">
				<div
					className="sidebar-menu-button"
					onClick={handleToggleSidebarNav}
				>
					Sidebar Menu
				</div>
			</div>

			<div
				className={`side-nav-wrapper ${
					isActiveSidebarNav ? "" : "active"
				}`}
			>
				<StickyBox
					className="sticky-box"
					offsetTop={50}
					offsetBottom={20}
				>
					{/* Close button */}
					<div
						className="close d-md-none"
						onClick={handleToggleSidebarNav}
					>
						<i className="bx bx-x"></i>
					</div>

					{/* Nav */}
					<div className="side-nav">
						<ul>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/">
									<a
										className={
											currentRoute === "/admin"
												? "active"
												: ""
										}
									>
										Dashboard
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/products/">
									<a
										className={
											currentRoute === "/admin/products" ||
											currentRoute ===
												"/admin/products/create"
												? "active"
												: ""
										}
									>
										Sản phẩm
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/categories/">
									<a
										className={
											currentRoute ===
												"/admin/categories" ||
											currentRoute ===
												"/admin/categories/create"
												? "active"
												: ""
										}
									>
										Danh mục
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/employee/">
									<a
										className={
											currentRoute ===
												"/admin/employee" ||
											currentRoute ===
												"/admin/employee/adminside"
												? "active"
												: ""
										}
									>
										Nhân viên
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/booking/">
									<a
										className={
											currentRoute ===
												"/admin/booking" ||
											currentRoute ===
												"/admin/booking/create"
												? "active"
												: ""
										}
									>
										Booking
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/revenue/">
									<a
										className={
											currentRoute ===
												"/admin/revenue" ||
											currentRoute ===
												"/admin/revenue/create"
												? "active"
												: ""
										}
									>
										Doanh thu
									</a>
								</Link>
							</motion.li>
						</ul>
					</div>
				</StickyBox>
			</div>
		</>
	);
};

export default AdminSideNav;
