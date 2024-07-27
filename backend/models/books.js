const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    bookname: {
        type: String,
        required: true,
        trim: true
    },
    authorname: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true
    },
    bookgenre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Booksmodel = mongoose.model("books", BooksSchema);
module.exports = Booksmodel;
