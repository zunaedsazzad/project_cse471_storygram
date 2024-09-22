import { useState } from "react"; // This import is unnecessary if useState is not used in this file
import Signup from "./components/registration/sign_up/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/registration/sign_in/signin.jsx";
import EmailVerification from "./components/home/home_1.jsx";
import Home from "./components/home/home.jsx";
import Initial from "./components/home/home_before.jsx";
import Emailinput from "./components/forget password/email_input.jsx";
import Newpassword from "./components/forget password/newpassword.jsx";
import Code from "./components/forget password/codepage.jsx";
import Addbook from "./components/mybooks/addbook/addbook.js";
import Collections from "./components/mybooks/show_my_books/books/books.jsx";
import ImagePromptApp from "./components/own_story/fetch_story/story.jsx";
import Myprofile from "./components/profile/profile.jsx";
import PostReview from "./components/review/postReview.jsx";
import ReviewsPage from "./components/review/getReviews.jsx";
import CreateAuction from "./components/Auction/CreateAuction.jsx";
import AllAuction from "./components/Auction/AllAuctions.jsx";
import Auction from "./components/Auction/Auction.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<Signup />} />
				<Route path="/sign_in" element={<Signin />} />
				<Route
					path="/verified/:token"
					element={<EmailVerification />}
				/>
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Initial />} />
				<Route path="/forget_password" element={<Emailinput />}></Route>
				<Route path="/code" element={<Code />}></Route>
				<Route path="/setnewpassword" element={<Newpassword />}></Route>
				<Route path="/addbook" element={<Addbook />}></Route>
				<Route path="/myCollections" element={<Collections />}></Route>
				<Route path="/profile" element={<Myprofile />}></Route>
				<Route path="/friends" element={<Myprofile />}></Route>
				<Route
					path="/create_story"
					element={<ImagePromptApp />}
				></Route>
				<Route path="/give_review" element={<PostReview />}></Route>
				<Route path="/show_reviews" element={<ReviewsPage />}></Route>
				<Route
					path="/create_auction"
					element={<CreateAuction />}
				></Route>
				<Route path="/auctions" element={<AllAuction />}></Route>
				<Route path="/auctions/:id" element={<Auction />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
