const mongoose = require('mongoose');


const FriendsListSchema = new mongoose.Schema({
  friend_one: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  friend_two: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  who_requested:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  is_requested: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
});


const FriendsListModel = mongoose.model('FriendsListModel', FriendsListSchema);

module.exports = FriendsListModel;
