import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FriendCard from "./friendcard";
import FriendSugCard from "./f_sugges_card";
import FriendReqCard from "./f_req_card";
import { Tooltip } from "antd";
import { Button, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPersonCircleQuestion,
	faUserPlus,
	faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import ProfileBody from "./ProfileBody";

const Myprofile = () => {
	const [open, setOpen] = useState(false);
	const [friends, setFriends] = useState([]);
	const [f_requests, setF_requests] = useState([]);
	const [f_suggestions, setF_suggestions] = useState([]);
	const [showfriend, setShowfriend] = useState("Friends");
	const [currentlySelected, setCurrentlySelected] = useState("Friends");
	const [showfriendreq, setShowfriendreq] = useState(
		<FontAwesomeIcon icon={faPersonCircleQuestion} />
	);
	const [addfriend, setAddfriend] = useState(
		<FontAwesomeIcon icon={faUserPlus} />
	);

	const navigate = useNavigate();

	const showDrawer = async () => {
		const token = localStorage.getItem("user_token");
		if (!token) throw new Error("No token found");

		const decodedToken = jwtDecode(token);
		const my_id = decodedToken._id;
		console.log(my_id);

		const body = { my_id: my_id };
		try {
			const response = await axios.post(
				"http://localhost:3500/friends",
				body
			);
			if (
				response.data &&
				Array.isArray(response.data) &&
				response.data.length > 0
			) {
				const friendsList = response.data[0].friends;
				if (Array.isArray(friendsList)) {
					setFriends(friendsList);
				} else {
					console.error("Unexpected friends format:", friendsList);
					setFriends([]);
				}
			} else {
				console.error("Unexpected response format:", response.data);
				setFriends([]);
			}
			setOpen(true);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching friends:", error);
			setFriends([]);
		}
	};

	const onClose = () => {
		setOpen(false);
		setAddfriend(<FontAwesomeIcon icon={faUserPlus} />);
		setShowfriendreq(<FontAwesomeIcon icon={faPersonCircleQuestion} />);
		setShowfriend("Friends");
	};
	const showfriends = () => {
		setShowfriend("Friends");
		setAddfriend(<FontAwesomeIcon icon={faUserPlus} />);
		setShowfriendreq(<FontAwesomeIcon icon={faPersonCircleQuestion} />);
	};

	const showfriendreqs = async () => {
		setShowfriendreq("Requests");
		setAddfriend(<FontAwesomeIcon icon={faUserPlus} />);
		setShowfriend(<FontAwesomeIcon icon={faUserGroup} />);
		const token = localStorage.getItem("user_token");
		if (!token) throw new Error("No token found");

		const decodedToken = jwtDecode(token);
		const my_id = decodedToken._id;
		console.log(my_id);

		const body = { my_id: my_id };
		try {
			const response = await axios.post(
				"http://localhost:3500/friends/friend_requests",
				body
			);
			console.log(response.data);
			if (
				response.data &&
				Array.isArray(response.data) &&
				response.data.length > 0
			) {
				const friendsuggestionsList = response.data[0].friends;
				if (Array.isArray(friendsuggestionsList)) {
					setF_requests(friendsuggestionsList);
				} else {
					console.error(
						"Unexpected friends format:",
						friendsuggestionsList
					);
					setF_requests([]);
				}
			} else {
				console.error("Unexpected response format:", response.data);
				setF_requests([]);
			}
		} catch (error) {
			console.error("Error fetching friends:", error);
			setF_requests([]);
		}
	};

	const addfriends = async () => {
		setAddfriend("Find Friends");
		setShowfriendreq(<FontAwesomeIcon icon={faPersonCircleQuestion} />);
		setShowfriend(<FontAwesomeIcon icon={faUserGroup} />);
		const token = localStorage.getItem("user_token");
		if (!token) throw new Error("No token found");

		const decodedToken = jwtDecode(token);
		const my_id = decodedToken._id;
		console.log(my_id);

		const body = { my_id: my_id };
		try {
			const response = await axios.post(
				"http://localhost:3500/friends/suggestions",
				body
			);
			if (
				response.data &&
				Array.isArray(response.data) &&
				response.data.length > 0
			) {
				const friendsuggestionsList = response.data;
				if (Array.isArray(friendsuggestionsList)) {
					setF_suggestions(friendsuggestionsList);
				} else {
					console.error(
						"Unexpected friends format:",
						friendsuggestionsList
					);
					setF_suggestions([]);
				}
			} else {
				console.error("Unexpected response format:", response.data);
				setF_suggestions([]);
			}
			console.log(f_requests);
		} catch (error) {
			console.error("Error fetching friends:", error);
			setF_suggestions([]);
		}
	};
	const Stories = async () => {
		navigate("/stories");
	};
	return (
		<body class="header">
			<header>
				<nav class="nav">
					<div class="logo">My profile</div>
					<div class="menu">
						<a
							onClick={() => navigate("/home")}
							style={{ cursor: "pointer" }}
						>
							Home
						</a>
						<a onClick={Stories} style={{ cursor: "pointer" }}>
							Stories
						</a>
						<a style={{ cursor: "pointer" }}>My library</a>
					</div>
					<div id="buttons">
						<button class="button">Wishlist</button>
						<button
							class="button"
							type="primary"
							onClick={showDrawer}
						>
							Friends
						</button>
					</div>
					<Drawer
						style={{ backgroundColor: "rgb(96, 83, 70)" }}
						onClose={onClose}
						open={open}
						closeIcon={null}
					>
						<div
							style={{
								display: "flex",
								gap: "60px",
								marginBottom: "20px",
							}}
						>
							<Tooltip title="Friends">
								<button
									style={{
										backgroundColor: "rgb(96, 83, 70)",
										fontWeight: "bold",
										width: "auto",
										height: "auto",
										paddingLeft: "10px",
										paddingRight: "10px",
										paddingTop: "5px",
										paddingBottom: "5px",
										color: "black",
										fontSize: "16px",
									}}
									onClick={() => {
										showfriends();
										setCurrentlySelected("Friends");
									}}
								>
									<h3>{showfriend}</h3>
								</button>
							</Tooltip>
							<Tooltip title="Requests">
								<button
									style={{
										backgroundColor: "rgb(96, 83, 70)",
										fontWeight: "bold",
										width: "auto",
										height: "auto",
										paddingLeft: "10px",
										paddingRight: "10px",
										paddingTop: "5px",
										paddingBottom: "5px",
										color: "black",
										fontSize: "16px",
									}}
									onClick={() => {
										showfriendreqs();
										setCurrentlySelected("Friends_req");
									}}
								>
									{showfriendreq}
								</button>
							</Tooltip>
							<Tooltip title="Add Friends">
								<button
									style={{
										backgroundColor: "rgb(96, 83, 70)",
										fontWeight: "bold",
										width: "auto",
										height: "auto",
										paddingLeft: "10px",
										paddingRight: "10px",
										paddingTop: "5px",
										paddingBottom: "5px",
										color: "black",
										fontSize: "15px",
									}}
									onClick={() => {
										addfriends();
										setCurrentlySelected("add_friend");
									}}
								>
									{addfriend}
								</button>
							</Tooltip>
						</div>
						<div className="friends">
							{currentlySelected === "Friends" &&
								friends.map((friend, index) => (
									<FriendCard key={index} friend={friend} />
								))}

							{currentlySelected === "Friends_req" &&
								f_requests.map((friend, index) => (
									<FriendReqCard
										key={index}
										friend={friend}
									/>
								))}

							{currentlySelected === "add_friend" &&
								f_suggestions.map((friend, index) => (
									<FriendSugCard
										key={index}
										friend={friend}
									/>
								))}
						</div>
					</Drawer>
				</nav>
				<ProfileBody />
			</header>
		</body>
	);
};

export default Myprofile;
