import React from "react";
import Link from "next/link";

const BannerCamping = ({
	title,
	slug,
	short_desc,
	latest_price,
	before_price,
	lessons,
	image,
	user,
	enrolments,
}) => {
	return (
		<div className="col-md-6">
			<div className="single-courses-box">
				<div className="courses-image">
					<Link href={`/course/${slug}`}>
						<a className="d-block image">
							<img src={image} alt={title} />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BannerCourses;
