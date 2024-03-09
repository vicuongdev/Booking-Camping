import React from "react";
import Navbar from "../components/_App/Navbar";
import MainBanner from "../components/camping/MainBanner";
import Features from "../components/camping/Features";
import GoogleMap from "../components/Booking/GoogleMap";
import Footer from "../components/_App/Footer"


function Index({ user }) {
	return (
		<>
			<Navbar user={user}/>
			<MainBanner/>
			<Features />
			<GoogleMap />
			<Footer />
		</>
	);
}



export default Index;