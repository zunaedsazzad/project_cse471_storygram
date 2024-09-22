const mongoose = require('mongoose')

const OwnstoryListSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title:{
        required: true,
        type: String
    },
    context:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true
    });

const OwnStoryModel = mongoose.model('MyStoryModel', OwnstoryListSchema);
module.exports = OwnStoryModel;