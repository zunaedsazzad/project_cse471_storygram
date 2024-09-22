const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    name:{
        required: true,
        type: String
    },
    title:{
        reqired: true,
        type: String
    },
    review:{
        required:true,
        type: String
    }


}, {
    timestamps: true
});

const BookRev = mongoose.model('BookRev', ReviewSchema);
module.exports = BookRev;