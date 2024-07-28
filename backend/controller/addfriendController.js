const friendlist = require("../models/FriendsListModel");
const Usersmodel = require('../models/users');
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');

const createFriendRequest = asyncHandler(async (req, res) => {
    const { my_id, frnd_id } = req.body;
    try {  
      const newFriendRequest = await friendlist.create({
        friend_one: my_id,
        friend_two: frnd_id,
        who_requested: my_id, 
        is_requested: true
      });

      res.status(201).json(newFriendRequest);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  const showFriendRequest = asyncHandler(async (req, res) => {
    const { my_id } = req.body;
    try {  
        const friendRequests = await friendlist.find({
            friend_two: my_id,
            is_requested: true
          })

      res.status(200).json(friendRequests);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  const acceptFriendRequest = asyncHandler(async (req, res) => {
    const { my_id } = req.body;
    try {  
        const acceptedfriendRequests = await friendlist.findOneAndUpdate(
            { friend_two: my_id, is_requested: true },
            { is_requested: false },
            { new: true }
          );

         if (!acceptedfriendRequests) {
         return res.status(404).json({ message: 'Friend request not found' });
          }
        

      res.status(200).json(acceptedfriendRequests);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  const showFriends = asyncHandler(async (req, res) => {
    const { my_id } = req.body;
    try {  
        // const friends1 = await friendlist.find({
        //     friend_two: my_id,
        //     is_requested: false
        //   })

        //   const friends2 = await friendlist.find({
        //     friend_one: my_id,
        //     is_requested: false
        //   })

        // if (friends1){
        //     const friends = await Usersmodel.find({friends1.friend_two})

        // }

        const friends = await friendlist.aggregate([
            {
              $match: {
                $or: [
                  { friend_one: new mongoose.Types.ObjectId(my_id) },
                  { friend_two: new mongoose.Types.ObjectId(my_id) }
                ]
              }
            },
            {
              $lookup: {
                from: 'users', // This should match the name of the users collection in your MongoDB
                let: { friendOne: '$friend_one', friendTwo: '$friend_two' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $or: [
                          { $eq: ['$_id', '$$friendOne'] },
                          { $eq: ['$_id', '$$friendTwo'] }
                        ]
                      }
                    }
                  },
                  {
                    $project: {
                      name: 1,
                      area: 1,
                      district: 1// Select the fields you want to include, here we include only the name
                    }
                  }
                ],
                as: 'friendsDetails'
              }
            },
            {
              $unwind: '$friendsDetails'
            },
            {
              $match: {
                'friendsDetails._id': { $ne: new mongoose.Types.ObjectId(my_id) }
              }
            },
            {
              $group: {
                _id: null,
                friends: { $addToSet:{
                    name: '$friendsDetails.name',
                    area: '$friendsDetails.area',
                    district: '$friendsDetails.district'} }
              }
            },
            {
              $project: {
                _id: 0,
                friends: 1
              }
            }
          ]);

      console.log(friends)

      res.status(200).json(friends);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports = {
    createFriendRequest,showFriendRequest, acceptFriendRequest,showFriends
};