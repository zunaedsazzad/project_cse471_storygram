import React, { useEffect, useState } from "react";
import "./ProfileBody.css";
import { useNavigate } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";

export default function ProfileBody() {
	const user_token = localStorage.getItem("user_token");
	const [user, setUser] = useState(null);
	const [editing, setEditing] = useState(false);
	const [updates, setUpdates] = useState({});
	const [selectedFile, setSelectedFile] = useState(null);
	const [pictureBase64, setPictureBase64] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:3500/getProfileData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_token }),
		})
			.then((response) => response.json())
			.then((data) => setUser(data))
			.catch((err) => console.error(err));
	}, [user_token]);

	const toggleEditing = () => {
		setEditing(!editing);
	};

	const updateField = (e) => {
		const { name, value } = e.target;
		setUpdates((prev) => ({ ...prev, [name]: value }));
	};

	const chooseFile = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPictureBase64(reader.result);
			};
			reader.readAsDataURL(file);
			setSelectedFile(file);
		}
	};

	const updatePicture = () => {
		fetch("http://localhost:3500/updateProfilePicture", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_token, picture: pictureBase64 }),
		})
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
				setSelectedFile(null);
				setPictureBase64(null);
			})
			.catch((err) => console.error(err));
	};

	const updateProfile = () => {
		fetch("http://localhost:3500/updateProfileData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_token, ...updates }),
		})
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
				setEditing(false);
			})
			.catch((err) => console.error(err));
	};

	const deleteProfile = (e) => {
		fetch("http://localhost:3500/deleteProfileData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_token }),
		})
			.then(() => {
				localStorage.clear();
				navigate("/");
			})
			.catch((err) => console.error(err));
	};

	const confirm = (e) => {
		console.log(e);
		message.success("Click on Yes");
	};
	const cancel = (e) => {
		console.log(e);
	};

	return (
		<div className="container-body">
			{user ? (
				<div className="container-card">
					<div className="container-content">
						<div className="container-picture">
							<img
								src={
									user.picture
										? user.picture
										: "https://via.placeholder.com/150"
								}
								alt="Profile"
								className="container-image"
							/>
							{selectedFile ? (
								<button
									className="container-btn"
									onClick={updatePicture}
								>
									{user.picture
										? "Change Picture"
										: "Add Picture"}
								</button>
							) : (
								<input
									type="file"
									className="container-file"
									accept="image/*"
									onChange={chooseFile}
								/>
							)}
						</div>

						<div className="container-details">
							<h2 className="container-title">User Profile</h2>
							<p className="container-text">
								<strong>Name:</strong>
								{editing ? (
									<input
										className="container-input"
										name="name"
										defaultValue={user.name}
										onChange={updateField}
									/>
								) : (
									user.name
								)}
							</p>
							<p className="container-text">
								<strong>Email:</strong> {user.email}
							</p>
							<p className="container-text">
								<strong>District:</strong>
								{editing ? (
									<input
										className="container-input"
										name="district"
										defaultValue={user.district}
										onChange={updateField}
									/>
								) : (
									user.district
								)}
							</p>
							<p className="container-text">
								<strong>Area:</strong>
								{editing ? (
									<input
										className="container-input"
										name="area"
										defaultValue={user.area}
										onChange={updateField}
									/>
								) : (
									user.area
								)}
							</p>
							<p className="container-text">
								<strong>Genres:</strong>
								{editing ? (
									<input
										className="container-input"
										name="genres"
										defaultValue={
											user.genres
												? user.genres.join(", ")
												: ""
										}
										onChange={updateField}
									/>
								) : user.genres ? (
									user.genres.join(", ")
								) : (
									""
								)}
							</p>

							<button
								className="container-btn"
								onClick={toggleEditing}
								style={{ marginTop: "10px" }}
							>
								{editing ? "Cancel" : "Edit Profile"}
							</button>
							{editing && (
								<button
									className="container-btn"
									onClick={updateProfile}
									style={{ marginTop: "10px" }}
								>
									Save Changes
								</button>
							)}

							<Popconfirm
								title="Delete the profile?"
								description="Are you sure to delete this profile?"
								onConfirm={deleteProfile}
								onCancel={cancel}
								okText="Yes"
								cancelText="No"
							>
								<button
									className="container-btn"
									style={{ marginTop: "10px" }}
								>
									Delete Profile
								</button>
							</Popconfirm>
						</div>
					</div>
				</div>
			) : (
				<p className="container-loading">Loading...</p>
			)}
		</div>
	);
}
