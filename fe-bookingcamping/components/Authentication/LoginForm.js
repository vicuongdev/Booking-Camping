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
};

const LoginForm = () => {
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
			const url = `${baseUrl}/api/auth/login`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			handleLogin(response.data, router);
			toast.success("Đăng nhập thành công", {
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
		} catch (err) {
			toast.error(err.response.data, {
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
				<h2>Đăng nhập</h2>

				<form onSubmit={handleSubmit}>
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

					<div className="row align-items-center">
						<div className="col-lg-12 col-md-12 col-sm-12 remember-me-wrap">
							<Link href="/register">
								<a className="lost-your-password">
									Bạn chưa có tài khoản? Đăng kí ngay.
								</a>
							</Link>
						</div>
					</div>

					<motion.button
						type="submit"
						disabled={disabled}
						whileTap={{ scale: 0.9 }}
					>
						Đăng nhập
						{loading ? <LoadingSpinner /> : ""}
					</motion.button>
				</form>
			</div>
		</>
	);
};

export default LoginForm;
