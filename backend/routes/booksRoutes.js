const express = require("express");
const router = express.Router();
const booksController = require("../controller/bookController");

router.route("/showAllBooks").get(booksController.showAllBooks);

module.exports = router;