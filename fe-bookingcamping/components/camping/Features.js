import React from "react";
import Link from "next/link";

const Features = () => {
	return (
		<>
			<div className="features-area pt-100 pb-70">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">
							
						</span>
						<h2>
							Chào mừng bạn tới Mada Lakeview Camping - Khu cắm trại Mã đà
						</h2>
						<p>
						Nơi hòa mình vào thiên nhiên hùng vĩ, trải nghiệm khám phá và tận hưởng bản hòa nhạc tự nhiên của cuộc sống!
						</p>
					</div>

					<div className="row justify-content-center">
						<div className="col-lg-4 col-sm-6 col-md-6">
							<div className="single-features-box">
								<div className="icon">
									<img src="/icon-images/icon-bath.png" alt="image"></img>
								</div>
								<h3>Đầy đủ tiện nghi</h3>
								<p>
									
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-sm-6 col-md-6">
							<div className="single-features-box">
								<div className="icon">
									<img src="/icon-images/icon-staff.png" alt="image"></img>
								</div>
								<h3>Đội ngũ nhân viên chuyên nghiệp</h3>
								<p>
									
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-sm-6 col-md-6">
							<div className="single-features-box">
								<div className="icon">
									<img src="/icon-images/icon-service.png" alt="image"></img>
								</div>
								<h3>Dịch dụ tốt - chu đáo</h3>
								<p>
									
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Features;
