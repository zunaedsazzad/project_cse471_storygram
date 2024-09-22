
const Review = require("../models/bookreview");
const Usersmodel = require("../models/users");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find({});
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reviews", error });
    }
  };

const bookRev = async (req, res) => {
    console.log("func called")
    const { user_token, title, review } = req.body;

    try {        
        const decoded = jwt.verify(user_token, secret);
        const id = decoded._id; 
        const email = decoded.email;

        
        const user = await Usersmodel.findOne({ email });
        const name = user.name;
        console.log(name)

        
        const bookrev = new Review({
            id,
            name,
            title,
            review
        });
        await bookrev.save();  
        res.status(201).json({ message: "Review saved successfully" });

    } catch (error) {
        console.error("Error saving review:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { bookRev, getAllReviews };


