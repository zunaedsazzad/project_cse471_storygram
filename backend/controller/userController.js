const Usersmodel = require("../models/users");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getProfile = async (req, res) => {
	try {
		const { user_token } = req.body;
		const decoded = jwt.verify(user_token, secret);
		const user = await Usersmodel.findOne({ email: decoded.email });
		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching profile:", error);
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Invalid token" });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
};

const updateProfile = async (req, res) => {
	try {
		const { user_token, ...updates } = req.body;
		const decoded = jwt.verify(user_token, secret);
		const user = await Usersmodel.findOneAndUpdate(
			{ email: decoded.email },
			updates,
			{ new: true }
		);
		res.status(200).json(user);
	} catch (error) {
		console.error("Error updating profile:", error);
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Invalid token" });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
};

const updateProfilePicture = async (req, res) => {
	try {
		const { user_token, picture } = req.body;
		const decoded = jwt.verify(user_token, secret);
		const user = await Usersmodel.findOneAndUpdate(
			{ email: decoded.email },
			{ picture },
			{ new: true }
		);
		res.status(200).json(user);
	} catch (error) {
		console.error("Error updating profile picture:", error);
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Invalid token" });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
};

const deleteProfile = async (req, res) => {
	try {
		const { user_token } = req.body;
		const decoded = jwt.verify(user_token, secret);
		await Usersmodel.findOneAndDelete({ email: decoded.email });
		res.status(200).json({ message: "Profile deleted" });
	} catch (error) {
		console.error("Error deleting profile:", error);
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Invalid token" });
		}
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getProfile,
	updateProfile,
	deleteProfile,
	updateProfilePicture,
};
