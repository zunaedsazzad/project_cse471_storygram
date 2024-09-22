const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users", // Assuming you have a users model
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		timestamp: {
			type: Date,
			default: Date.now,
		},
	},
	{ _id: false }
);

const BookAuctionSchema = new mongoose.Schema(
	{
		bookName: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		language: {
			type: String,
			required: true,
			trim: true,
		},
		genre: {
			type: String,
			required: true,
			trim: true,
		},
		picture: {
			type: String, // URL or path to the image
			required: true,
		},
		startingBid: {
			type: Number,
			required: true,
		},
		currentBid: {
			type: Number,
			default: 0,
		},
		bids: [BidSchema],
		auctionEnd: {
			type: Date,
			required: true,
		},
		auctionOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users", // Assuming you have a users model
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		acceptedBid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bid",
		},
	},
	{
		timestamps: true,
	}
);

const BookAuction = mongoose.model("BookAuction", BookAuctionSchema);
module.exports = BookAuction;
