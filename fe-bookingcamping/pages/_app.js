import React from "react";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import cookie from 'js-cookie';
import {redirectUser} from "../utils/auth"
import { removeCookieTokens } from "../utils/auth";
import { baseUrl } from "../utils/baseUrl";
import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "../styles/boxicons.min.css";
import "../styles/flaticon.css";
import "../styles/nprogress.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
import "react-confirm-alert/src/react-confirm-alert.css";
import "@etchteam/next-pagination/dist/index.css";
import "react-loading-skeleton/dist/skeleton.css";
// Global Styles
import "../styles/style.css";
import "../styles/responsive.css";

// Dashboard
import "../styles/dashboard.css";

import Layout from "../components/_App/Layout";

// import {
// 	setCurrentUser,
// 	setAuthToken,
// 	setRefreshToken
//   } from '../store/actions/authActions';


function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);

	return (
		
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { auth_token } = parseCookies(ctx);
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	if (!auth_token) {
		// if a user not logged in then user can't access those pages
		const isProtectedRoute =
			ctx.pathname === "/profile/basic-information" ||
			ctx.pathname === "/booking" ||
			ctx.pathname === "/booking/booking-history" ||
			ctx.pathname === "/admin" ||
			ctx.pathname === "/admin/categories" ||
			ctx.pathname === "/admin/employee" ||
			ctx.pathname === "/admin/products";

		if (isProtectedRoute) {
			redirectUser(ctx, "/login");
		}
	} else {
		// if a user logged in then user can't access those pages
		const ifLoggedIn =
			ctx.pathname === "/login" ||
			ctx.pathname === "/register";
		if (ifLoggedIn) {
			redirectUser(ctx, "/");
		}

		try {
			const options = {
				headers: {
				  Authorization: `Bearer ${auth_token}`,
				},
				withCredentials: true,
			  };
			
			const url = `${baseUrl}/api/auth/current-user`;
			const response = await axios.get(url, options);
			const user = response && response.data;

			if (!user) {
				removeCookieTokens();
				localStorage.removeItem('currentUser');
				redirectUser(ctx, "/login");
			}
			localStorage.setItem('currentUser', JSON.stringify(response.data));
			pageProps.user = user;
		} catch (err) {
			removeCookieTokens();
			// redirectUser(ctx, "/");
		}
	}
	return {
		pageProps,
	};
};



export default MyApp;
