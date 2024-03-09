import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const initday = "";

const FilterByDateBooking = () => {
	const router = useRouter();
	const date = router.query.day ? router.query.day : "";
	const [day, setDay] = useState(date);
	

	const handleChange = (e) => {
		setDay(e.target.value);
	};

	useEffect(() => {
		const query = router.query;
			router.push({
				pathname: "/admin/booking",
				query: { ...query, day: day },
			});
		
		console.log(day)
	}, [day]);

	return (
		<div className="">
					<label className="form-label fw-semibold p-3">
						Lọc theo ngày
					</label>
					<input
						type="date"
						name="day"
						value={day}
						onChange={handleChange}
					/>
				</div>
	);
};

export default FilterByDateBooking;
