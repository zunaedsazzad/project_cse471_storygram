import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateAuction.css";
import "./bg.css";

export default function CreateAuction() {
	const [bookName, setBookName] = useState("");
	const [author, setAuthor] = useState("");
	const [language, setLanguage] = useState("");
	const [genre, setGenre] = useState("");
	const [picture, setPicture] = useState("");
	const [startingBid, setStartingBid] = useState("");
	const [auctionEnd, setAuctionEnd] = useState("");
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				setPicture(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccessMessage("");

		try {
			await axios.post("http://localhost:3500/auction/create", {
				bookName,
				author,
				language,
				genre,
				picture,
				startingBid,
				auctionEnd,
				user_token: localStorage.getItem("user_token"),
			});
			setSuccessMessage("Auction created successfully!");
			setBookName("");
			setAuthor("");
			setLanguage("");
			setGenre("");
			setPicture("");
			setStartingBid("");
			setAuctionEnd("");
			setImagePreview(null);
		} catch (error) {
			setError("Failed to create auction. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bgpicture">
			<div className="logo2" onClick={() => navigate("/home")}>
				Storygram
			</div>
			<div className="ancient-vault">
				<h2 className="scroll-of-creation">Create Auction</h2>
				<form onSubmit={handleSubmit}>
					<label className="glyph-label">Book Name</label>
					<input
						className="quill-input"
						type="text"
						value={bookName}
						onChange={(e) => setBookName(e.target.value)}
						required
					/>

					<label className="glyph-label">Author</label>
					<input
						className="quill-input"
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						required
					/>

					<label className="glyph-label">Language</label>
					<input
						className="quill-input"
						type="text"
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
						required
					/>

					<label className="glyph-label">Genre</label>
					<input
						className="quill-input"
						type="text"
						value={genre}
						onChange={(e) => setGenre(e.target.value)}
						required
					/>

					<label className="glyph-label">Picture</label>
					<input
						className="file-selector"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
					/>
					{imagePreview && (
						<img
							className="image-illustration"
							src={imagePreview}
							alt="Preview"
						/>
					)}

					<label className="glyph-label">Starting Bid</label>
					<input
						className="number-input"
						type="number"
						value={startingBid}
						onChange={(e) => setStartingBid(e.target.value)}
						required
					/>

					<label className="glyph-label">Auction End</label>
					<input
						className="datetime-input"
						type="datetime-local"
						value={auctionEnd}
						onChange={(e) => setAuctionEnd(e.target.value)}
						required
					/>

					{error && <div className="error-message">{error}</div>}
					{successMessage && (
						<div className="success-message">{successMessage}</div>
					)}
					<button
						className="magic-button"
						type="submit"
						disabled={loading}
					>
						{loading ? "Creating..." : "Create Auction"}
					</button>
				</form>
			</div>
		</div>
	);
}
