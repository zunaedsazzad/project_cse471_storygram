import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllAuction.css";

export default function AllAuction() {
	const [auctions, setAuctions] = useState([]);
	const navigate = useNavigate();

	const fetchAuctions = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3500/auction/active"
			);
			setAuctions(response.data);
		} catch (error) {
			console.error("Error fetching auctions:", error);
		}
	};
	useEffect(() => {
		fetchAuctions();
	}, []);

	return (
		<div className="bgpicture">
			<div className="logo2" onClick={() => navigate("/home")}>
				Storygram
			</div>
			<div className="marketplace-hall">
				<h2 className="scroll-heading">Available Auctions</h2>
				<div className="auction-scroll">
					{auctions.map((auction, index) => (
						<Link
							to={`/auctions/${auction._id}`}
							key={index}
							className="auction-scroll-link"
						>
							<div className="ancient-card">
								<img
									src={auction.picture}
									alt={auction.bookName}
									className="ancient-picture"
								/>
								<div className="ancient-info">
									<h3 className="ancient-book-title">
										{auction.bookName}
									</h3>
									<p className="ancient-author">
										by {auction.author}
									</p>
									<p className="ancient-bid">
										Starting Bid: ${auction.startingBid}
									</p>
									<p className="ancient-end">
										Ends:{" "}
										{new Date(
											auction.auctionEnd
										).toLocaleString()}
									</p>
									{/* <p>{auction.auctionOwner}</p> */}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
