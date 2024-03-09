import FeedbackList from '../../components/Feedback/FeedbackList'
import Navbar from '../../components/_App/Navbar';
import PageBanner from '../../components/Common/PageBanner';
import Footer from '../../components/_App/Footer';

export default function FeedbackPage({ user }) {
	return (
		<>
			<Navbar user={user} />
			<PageBanner
				pageTitle="Đánh giá"
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText="Đánh giá"
			/>
            <FeedbackList/>
			<Footer/>
		</>
	);
}



