import React from "react";
import ActiveLink from "../../utils/ActiveLink";
import { useRouter } from "next/router";
import cookie from "js-cookie";

const ProfileDropdown = ({ ...user}) => {
	const isAdmin = user.role == 1;
	const isEmployee = user.role == 2;
	const isCustomer = user.role == 3;

	const router = useRouter();
	const handleLogout = () => {
		cookie.remove("auth_token");
		cookie.remove("refreshtoken");
		router.push("/");
	}

	return (
		<div className="dropdown profile-dropdown">
			<div className="img ptb-15">
				{/* {profile_photo ? (
					<img src={profile_photo} alt={first_name} />
				) : ( */}
					<img src="/images/avatar.jpg" alt={user.fullName} />
				{/* )} */}
			</div>
			<ul className="dropdown-menu">
				<li>
					<ActiveLink href="/profile/basic-information/">
						<a className="dropdown-item author-dropdown-item">
							<div className="d-flex align-items-center">
								<div className="img">
									{/* {profile_photo ? (
										<img
											src={profile_photo}
											alt={first_name}
										/>
									) : ( */}
										<img
											src="/images/avatar.jpg"
											alt={user.userName}
										/>
									{/* )} */}
								</div>

								<span className="ps-3">
									<span className="fw-semibold fs-16 mb-1 d-block">
										{user.fullName}
									</span>
									<span className="d-block fs-13 mt-minus-2">
										{user.phoneNumber}
									</span>
								</span>
							</div>
						</a>
					</ActiveLink>
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>

				{/* {isInstructor && (
					<>
						<li>
							<ActiveLink href="/instructor/courses">
								<a className="dropdown-item">
									<i className="bx bx-book"></i>
									My Courses
								</a>
							</ActiveLink>
						</li>
						<li>
							<ActiveLink href="/instructor/course/create">
								<a className="dropdown-item">
									<i className="bx bx-folder-plus"></i> Create
									New Course
								</a>
							</ActiveLink>
						</li>
					</>
				)} */}
				{isAdmin && (
					<li>
						<ActiveLink href="/admin">
							<a className="dropdown-item">
								<i className="bx bxs-dashboard"></i> My
								Dashboard
							</a>
						</ActiveLink>
					</li>
				)}

				<li>
					<ActiveLink href="/booking/booking-history">
						<a className="dropdown-item">
							<i className="bx bx-book"></i>
							Lịch sử đặt chỗ
						</a>
					</ActiveLink>
				</li>
				

				<li>
					<ActiveLink href="/profile/basic-information/">
						<a className="dropdown-item">
							<i className="bx bxs-user-account"></i> Cài đặt tài khoản
						</a>
					</ActiveLink>
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>
				<li>
					<button
						type="submit"
						onClick={handleLogout}
						className="dropdown-item"
					>
						<i className="bx bx-log-out"></i> Đăng xuất
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ProfileDropdown;
