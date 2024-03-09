import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import BannerCourses from "./BannerCourses";

const MainBanner = ({ user, courses }) => {
	return (
		<>
			<div className="main-banner">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="main-banner-content">
								<h1>
								Mada Lakeview Camping - Khu cắm trại Mã Đà

								</h1>
								<p>
									Đắm chìm trong bản hòa nhạc tự nhiên, cắm trại tại Mã Đà - Nơi khám phá bản nguyên hoang dã, nâng cao tinh thần phiêu lưu và kết nối tận cùng với thiên nhiên.
								</p>

								<motion.div whileTap={{ scale: 0.9 }}>
									{user ? (
										<Link href="/courses">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												Browse Courses <span></span>
											</a>
										</Link>
									) : (
										<Link href="/booking">
											<a className="default-btn">
												<i className="flaticon-user"></i>{" "}
												Đặt chỗ ngay <span></span>
											</a>
										</Link>
									)}
								</motion.div>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="main-banner-courses-list">
								<div className="row">
									<Swiper
										pagination={{
											dynamicBullets: true,
											clickable: true,
										}}
										modules={[Pagination]}
										className="mySwiper feedback-slides"
									>
											<SwiperSlide>
												<div className="slider-image-item">
													<div className="align-items-center">
														<img
															src="/images/banner/banner4.jpg"
															alt="image"
														/>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="slider-image-item">
													<div className="align-items-center">
														<img
															src="/images/banner/banner2.jpg"
															alt="image"
														/>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="slider-image-item">
													<div className="align-items-center">
														<img
															src="/images/banner/banner3.jpg"
															alt="image"
														/>
													</div>
												</div>
											</SwiperSlide>
									</Swiper>
								</div>

								<div className="banner-shape1">
									<img
										src="/images/banner-shape1.png"
										alt="image"
									/>
								</div>
								<div className="banner-shape2">
									<img
										src="/images/banner-shape2.png"
										alt="image"
									/>
								</div>
								<div className="banner-shape3">
									<img
										src="/images/banner-shape3.png"
										alt="image"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MainBanner;
