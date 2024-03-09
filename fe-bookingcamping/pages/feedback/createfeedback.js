import FeedbackForm from '../../components/Feedback/FeedbackForm';
import Navbar from '../../components/_App/Navbar';
import Footer from '../../components/_App/Footer';

export default function FeedbackPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			{/* <div>
                <FeedbackForm />
            </div>    */}
			<div className="profile-authentication-area ptb-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6 col-md-12">
						<FeedbackForm user={user} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}



