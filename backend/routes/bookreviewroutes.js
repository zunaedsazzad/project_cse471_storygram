
const express =require('express');
const router= express.Router();
const savereview = require("../controller/bookRev")

router.route("/book_reviews").post(savereview.bookRev)
router.route("/get_reviews").get(savereview.getAllReviews)


module.exports=router;

