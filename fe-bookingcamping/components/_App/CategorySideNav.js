import React, { useEffect, useState } from "react";
import Link from "next/link";
import StickyBox from "react-sticky-box";
import { motion } from "framer-motion";
import { baseUrl } from "../../utils/baseUrl";
import {useRouter} from "next/router";
import axios from "axios";

const CategorySideNav = () => {
	const [categories, setCategories] = React.useState([]);

	const router = useRouter();
	const currentRoute = router.pathname;



	// Sidebar Nav
	const [isActiveSidebarNav, setActiveSidebarNav] = useState("false");

	const handleToggleSidebarNav = () => {
		setActiveSidebarNav(!isActiveSidebarNav);
	};

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const url = `${baseUrl}/api/category/GetAllCategory`
			const response = await axios.get(url);
			setCategories(response.data);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	  
		fetchData();
	  }, []);

	

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
								<Link href="/product">
									<a
										className = {currentRoute === "/product" ? "active" : ""}
									>
										Tất cả
									</a>
								</Link>
							</motion.li>
							{categories && categories.map((category) =>(
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
								key={categories.categoryID}
								>
								<Link  href={`/category/${category.categoryID}`}>
									<a
										className = {currentRoute === `/category/${category.categoryID}` ? "active" : ""}
									>
										{category.categoryName}
									</a>
									</Link>
								</motion.li>
							))}

						</ul>
					</div>
				</StickyBox>
			</div>
		</>
	);
};

export default CategorySideNav;
