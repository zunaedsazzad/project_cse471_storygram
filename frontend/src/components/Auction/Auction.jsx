import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Auction.css";
import "./bg.css";

export default function Auction() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [auction, setAuction] = useState(null);
	const [bidAmount, setBidAmount] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const user_token = localStorage.getItem("user_token");
	const user_id = jwtDecode(user_token)._id;

	useEffect(() => {
		if (!id || !user_id) {
			navigate("/auctions");
		}

		const fetchAuction = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3500/auction/${id}`
				);
				setAuction(response.data);
			} catch (error) {
				console.error("Error fetching auction details:", error);
			}
		};

		fetchAuction();
	}, [id, user_id]);

	const handleBid = async () => {
		setErrorMessage("");
		setSuccessMessage("");

		if (auction.auctionOwner === user_id) {
			setErrorMessage("You cannot bid on your own auction.");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:3500/auction/bid",
				{
					auctionId: auction._id,
					userId: user_id,
					amount: bidAmount,
				}
			);
			setSuccessMessage(response.data.message);
			setAuction(response.data.auction);
			setBidAmount("");
		} catch (error) {
			console.error("Error placing bid:", error);
			setErrorMessage("Error placing bid. Please try again.");
		}
	};

	return (
		<div className="bgpicture">
			<div className="logo2" onClick={() => navigate("/home")}>
				Storygram
			</div>
			<div className="auction-chamber">
				{auction ? (
					<>
						<h2 className="auction-scroll-title">
							{auction.bookName}
						</h2>
						<div className="auction-detail">
							<img
								src={auction.picture}
								alt={auction.bookName}
								className="auction-scroll-image"
							/>
							<div className="auction-scroll-info">
								<p>Author: {auction.author}</p>
								<p>Language: {auction.language}</p>
								<p>Genre: {auction.genre}</p>
								<p>Current Bid: ${auction.currentBid}</p>
								<p>
									Auction Ends:{" "}
									{new Date(
										auction.auctionEnd
									).toLocaleString()}
								</p>
							</div>
						</div>

						<h3 className="auction-bid-title">Bids</h3>
						<ul className="auction-bid-list">
							{auction.bids.map((bid) => (
								<li key={bid._id} className="auction-bid-item">
									<span>{bid.userId.name}</span>
									<span>${bid.amount}</span>
									<span>
										{new Date(
											bid.timestamp
										).toLocaleString()}
									</span>
								</li>
							))}
						</ul>

						{auction.auctionOwner !== user_id && (
							<div className="bid-section">
								<input
									type="number"
									value={bidAmount}
									onChange={(e) =>
										setBidAmount(e.target.value)
									}
									placeholder="Enter your bid"
									className="bid-input"
								/>
								<button
									onClick={handleBid}
									className="bid-button"
								>
									Place/Update Bid
								</button>
							</div>
						)}

						{errorMessage && (
							<div className="error">{errorMessage}</div>
						)}
						{successMessage && (
							<div className="success">{successMessage}</div>
						)}
					</>
				) : (
					<p>Loading auction details...</p>
				)}
			</div>
		</div>
	);
}
