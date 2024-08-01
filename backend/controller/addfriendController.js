const friendlist = require("../models/FriendsListModel");
const Usersmodel = require("../models/users");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const getFriendSuggestions = asyncHandler(async (req, res) => {
  const { my_id } = req.body;

  try {
    const friends = await friendlist.aggregate([
      {
        $match: {
          $or: [
            { friend_one: new mongoose.Types.ObjectId(my_id) },
            { friend_two: new mongoose.Types.ObjectId(my_id) },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          friendId: {
            $cond: [
              { $eq: ["$friend_one", new mongoose.Types.ObjectId(my_id)] },
              "$friend_two",
              "$friend_one",
            ],
          },
        },
      },
    ]);

    const friendIds = friends.map(friend => friend.friendId);

    const suggestions = await Usersmodel.find({
      _id: { $nin: [new mongoose.Types.ObjectId(my_id), ...friendIds] },
    }).select('name area district');

    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error); // This will log the error details in the terminal
    res.status(500).json({ message: "Server Error" });
  }
});



const createFriendRequest = asyncHandler(async (req, res) => {
  const { my_id, frnd_id } = req.body;

  try {
    // Check if there is already a pending or accepted request
    const existingRequest = await friendlist.findOne({
      $or: [
        { friend_one: my_id, friend_two: frnd_id },
        { friend_one: frnd_id, friend_two: my_id },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists or you are already friends." });
    }

    const newFriendRequest = await friendlist.create({
      friend_one: my_id,
      friend_two: frnd_id,
      who_requested: my_id,
      is_requested: true,
    });

    res.status(201).json(newFriendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const showFriendRequest = asyncHandler(async (req, res) => {
  const { my_id } = req.body;
  try {
    const friends = await friendlist.aggregate([
      {
        $match: {
          $or: [
            { friend_two: new mongoose.Types.ObjectId(my_id) },
          ],
          is_requested: true,
        },
      },
      {
        $lookup: {
          from: "users", // This should match the name of the users collection in your MongoDB
          let: { friendOne: "$friend_one", friendTwo: "$friend_two", isRequested: "$is_requested"},
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$_id", "$$friendOne"] },
                    { $eq: ["$_id", "$$friendTwo"] },
                  ],
                },
              },
            },
            {
              $project: {
                _id:1,
                name: 1,
                area: 1,
                district: 1, // Select the fields you want to include, here we include only the name
              },
            },
          ],
          as: "friendsDetails",
        },
      },
      {
        $unwind: "$friendsDetails",
      },
      {
        $match: {
          "friendsDetails._id": { $ne: new mongoose.Types.ObjectId(my_id) },
        },
      },
      {
        $group: {
          _id: null,
          friends: {
            $addToSet: {
              _id: "$friendsDetails._id",
              name: "$friendsDetails.name",
              area: "$friendsDetails.area",
              district: "$friendsDetails.district",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          friends: 1,
        },
      },
    ]);

    console.log(friends);

    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { my_id, frnd_id } = req.body;
  try {
    const acceptedFriendRequest = await friendlist.findOneAndUpdate(
      {
        friend_two: frnd_id,
        friend_one: my_id,
        is_requested: true,
      },
      { is_requested: false }, // Set request to accepted
      { new: true }
    );

    if (!acceptedFriendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    res.status(200).json({ message: "Friend request accepted", acceptedFriendRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


const showFriends = asyncHandler(async (req, res) => {
  const { my_id } = req.body;
  try {
    const friends = await friendlist.aggregate([
      {
        $match: {
          $or: [
            { friend_one: new mongoose.Types.ObjectId(my_id) },
            { friend_two: new mongoose.Types.ObjectId(my_id) },
          ],
          is_requested: false,
        },
      },
      {
        $lookup: {
          from: "users", // This should match the name of the users collection in your MongoDB
          let: { friendOne: "$friend_one", friendTwo: "$friend_two", isRequested: "$is_requested"},
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$_id", "$$friendOne"] },
                    { $eq: ["$_id", "$$friendTwo"] },
                  ],
                },
              },
            },
            {
              $project: {
                name: 1,
                area: 1,
                district: 1, // Select the fields you want to include, here we include only the name
              },
            },
          ],
          as: "friendsDetails",
        },
      },
      {
        $unwind: "$friendsDetails",
      },
      {
        $match: {
          "friendsDetails._id": { $ne: new mongoose.Types.ObjectId(my_id) },
        },
      },
      {
        $group: {
          _id: null,
          friends: {
            $addToSet: {
              name: "$friendsDetails.name",
              area: "$friendsDetails.area",
              district: "$friendsDetails.district",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          friends: 1,
        },
      },
    ]);

    console.log(friends);

    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  getFriendSuggestions,
  createFriendRequest,
  showFriendRequest,
  acceptFriendRequest,
  showFriends,
};
