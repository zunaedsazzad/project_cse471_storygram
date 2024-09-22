const express = require("express");
const router = express.Router();
const bookAuctionController = require("../controller/bookAuctionController");

router.post("/create", bookAuctionController.createAuction);
router.get("/active", bookAuctionController.getActiveAuctions);
router.get("/:id", bookAuctionController.getAuctionById);
router.post("/bid", bookAuctionController.placeBid);

module.exports = router;
