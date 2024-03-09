import React, { useState, useEffect } from "react";
import FunFacts from "./FunFacts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";

const MainSliderImage = () => {
	

	

	return (
		<>
			<div className="funfacts-and-feedback-area ptb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="feedback-content">
								<Swiper
									pagination={{
										dynamicBullets: true,
										clickable: true,
									}}
									modules={[Pagination]}
									className="mySwiper feedback-slides"
								>
											<SwiperSlide>
												<div className="single-feedback-item">

													<div className="client-info d-flex align-items-center">
														<img
															src="/images/mainbanner/banner1.jpg"
															className="rounded-circle"
															alt="image"
														/>
													</div>
												</div>
											</SwiperSlide>
								</Swiper>
							</div>
						</div>
					</div>
				</div>

				<div className="shape2">
					<img src="/images/shape2.png" alt="image" />
				</div>
				<div className="shape3">
					<img src="/images/shape3.png" alt="image" />
				</div>
				<div className="shape4">
					<img src="/images/shape4.png" alt="image" />
				</div>
				<div className="shape9">
					<img src="/images/shape8.svg" alt="image" />
				</div>
			</div>
		</>
	);
};

export default FeedbackSliderWithFunFacts;
