const Usersmodel = require("../models/users");
const BookAuction = require("../models/BookAuctionSchema");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getUserFromToken = async (user_token) => {
	const decoded = jwt.verify(user_token, secret);
	return await Usersmodel.findOne({ email: decoded.email });
};

const createAuction = async (req, res) => {
	try {
		const { user_token } = req.body;
		const user = await getUserFromToken(user_token);

		const {
			bookName,
			author,
			language,
			genre,
			picture,
			startingBid,
			auctionEnd,
		} = req.body;
		const auction = new BookAuction({
			bookName,
			author,
			language,
			genre,
			picture,
			startingBid,
			auctionEnd,
			auctionOwner: user._id,
		});
		await auction.save();
		res.status(201).json(auction);
	} catch (error) {
		console.error("Error creating auction:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getActiveAuctions = async (req, res) => {
	try {
		const now = new Date();
		const activeAuctions = await BookAuction.find({
			auctionEnd: { $gt: now },
			isActive: true,
		});
		console.log(activeAuctions.length);
		res.status(200).json(activeAuctions);
	} catch (error) {
		console.error("Error fetching active auctions:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getAuctionById = async (req, res) => {
	try {
		const { id } = req.params;
		const auction = await BookAuction.findById(id).populate(
			"bids.userId",
			"name"
		);
		res.status(200).json(auction);
	} catch (error) {
		console.error("Error fetching auction by id:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const placeBid = async (req, res) => {
	try {
		const { auctionId, userId, amount } = req.body;
		const auction = await BookAuction.findById(auctionId);

		if (!auction) {
			return res.status(404).json({ message: "Auction not found" });
		}

		if (auction.auctionOwner.toString() === userId) {
			return res
				.status(403)
				.json({ message: "You cannot bid on your own auction" });
		}

		const existingBid = auction.bids.find(
			(bid) => bid.userId.toString() === userId
		);
		if (existingBid) {
			existingBid.amount = amount;
			existingBid.timestamp = new Date();
		} else {
			auction.bids.push({ userId, amount });
		}

		auction.currentBid = Math.max(auction.currentBid, amount);
		await auction.save();
		res.status(200).json({ message: "Bid placed successfully", auction });
	} catch (error) {
		console.error("Error placing bid:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	createAuction,
	getActiveAuctions,
	getAuctionById,
	placeBid,
};
