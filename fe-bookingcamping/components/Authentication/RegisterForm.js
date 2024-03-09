import React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { handleLogin } from "../../utils/auth";
import LoadingSpinner from "../../utils/LoadingSpinner";
import {baseUrl} from "../../utils/baseUrl";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const INITIAL_USER = {
	username: "",
	password: "",
	phonenumber: "",
	fullname: "",
	image: "hinh",
	roleid: 3,
};

const RegisterForm = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			// if(user.password != confirmpassword) {
			// 	toast.warning("Xác nhận mật khẩu không khớp", {
			// 		style: {
			// 			border: "1px solid #ff0033",
			// 			padding: "16px",
			// 			color: "#ff0033",
			// 		},
			// 		iconTheme: {
			// 			primary: "#ff0033",
			// 			secondary: "#FFFAEE",
			// 		},
			// 	})
			// 	return;
			// }

			const url = `${baseUrl}/api/auth/register`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			// handleLogin(response.data.elarniv_users_token, router);
			toast.success("Đăng kí thành công", {
				style: {
					border: "1px solid #4BB543",
					padding: "16px",
					color: "#4BB543",
				},
				iconTheme: {
					primary: "#4BB543",
					secondary: "#FFFAEE",
				},
			});
			router.push("/login");
		} catch (error) {
			// let {
			// 	response: {
			// 	  data: { message },
			// 	},
			// } = error;
			toast.error("Đăng kí thất bại", {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="login-form">
				<h2>Đăng kí</h2>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Họ tên</label>
						<input
							type="text"
							className="form-control"
							placeholder="Họ tên"
							name="fullname"
							value={user.fullname}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Số điện thoại</label>
						<input
							type="tel"
							className="form-control"
							placeholder="Số điện thoại"
							name="phonenumber"
							value={user.phonenumber}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Tên đăng nhập</label>
						<input
							type="text"
							className="form-control"
							placeholder="Tên đăng nhập"
							name="username"
							value={user.username}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Mật khẩu</label>
						<input
							type="password"
							className="form-control"
							placeholder="Mật khẩu"
							name="password"
							value={user.password}
							onChange={handleChange}
						/>
					</div>
					{/* <div className="form-group">
						<label>Xác nhận mật khẩu</label>
						<input
							type="password"
							className="form-control"
							placeholder="Xác nhận mật khẩu"
							name="confirm-password"
							value={confirmpassword}
							onChange={handleChange}
						/>
					</div> */}

					<p className="description">
						The password should be at least eight characters long.
						To make it stronger, use upper and lower case letters,
						numbers, and symbols like ? $ % ^ & )
					</p>

					<motion.button
						type="submit"
						disabled={disabled}
						whileTap={{ scale: 0.9 }}
					>
						Đăng kí
						{loading ? <LoadingSpinner /> : ""}
					</motion.button>
				</form>
			</div>
		</>
	);
};

export default RegisterForm;
