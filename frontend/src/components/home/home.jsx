import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Dropdown, Menu } from "antd";
import "./home_before.css";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [error, setError] = useState([]);
	const navigate = useNavigate();

	const handleSignOut = () => {
		localStorage.clear();
		navigate("/");
	};

	const goToProfile = () => {
		navigate("/profile");
	};

	const showMyBooks = async () => {
		try {
			const token = localStorage.getItem("user_token");
			if (!token) {
				throw new Error("No token found");
			}

			const decodedToken = jwtDecode(token);
			const _id = decodedToken._id;

			const response = await axios.get(
				`http://localhost:3500/api/books?_id=${_id}`
			);
			console.log(response.data);
			localStorage.setItem("books", JSON.stringify(response.data));

			navigate("/myCollections");
		} catch (error) {
			console.error("There was an error!", error);
			setError(error.response?.data?.message || "An error occurred.");
		}
	};
	const showReviews = async () => {
		navigate("/show_reviews");
	};
	const handleMenuClick = (e) => {
		if (e.key === "1") {
			navigate("/create_story");
		} else if (e.key === "2") {
			navigate("/give_review");
		} else if (e.key === "3") {
			navigate("/create_auction");
		}
	};

	const createMenu = (
		<Menu
			onClick={handleMenuClick}
			items={[
				{
					key: "1",
					label: "Create a new story",
				},
				{
					key: "2",
					label: "Create a review",
				},
				{
					key: "3",
					label: "Create an auction",
				},
			]}
		/>
	);

	return (
		<body className="header">
			<header>
				<nav className="nav">
					<div className="logo">Storygram</div>
					<div className="menu">
						<a onClick={showReviews} style={{ cursor: "pointer" }}>
							Book Reviews
						</a>
						<Dropdown overlay={createMenu} placement="bottomLeft">
							<a style={{ cursor: "pointer" }}>Create</a>
						</Dropdown>
						<a onClick={showMyBooks} style={{ cursor: "pointer" }}>
							My library
						</a>
						<a
							onClick={() => navigate("/auctions")}
							style={{ cursor: "pointer" }}
						>
							Auctions
						</a>
					</div>
					<div>
						<button className="button" onClick={handleSignOut}>
							Sign out
						</button>
						<button className="button" onClick={goToProfile}>
							Profile
						</button>
					</div>
				</nav>
				<section className="h-txt">
					<h3 id="h2">About us</h3>
					<h4 id="h3">
						Welcome to Storygram, your ultimate online community for
						book lovers! At Storygram, we believe in the power of
						sharing stories and the joy of discovering new worlds
						through the pages of a book. Our mission is to create a
						vibrant, interactive platform where readers can connect,
						lend and borrow books, and engage in meaningful
						conversations.
					</h4>
					<br />
				</section>
			</header>
		</body>
	);
};

export default Home;
