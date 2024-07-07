const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
      isVerified: {
        type: Boolean,
        default: false
      },
      district: {
        type: String,
        required: true,
        trim: true
      },
      area: {
        type: String,
        required: true,
        trim: true
      },
      genres: {
        type: [String],
        required: true
      }
    }, {
      timestamps: true
    });

const Usersmodel = mongoose.model("users", UsersSchema);
module.exports = Usersmodel;


