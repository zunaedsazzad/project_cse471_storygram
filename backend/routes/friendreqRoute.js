const express = require("express");
const router = express.Router();
const friendsController = require("../controller/addfriendController");

router.route("/sent_friend_requests").post(friendsController.createFriendRequest);
router.route("/friend_requests").get(friendsController.showFriendRequest)
router.route("/accept_request").post(friendsController.acceptFriendRequest)
router.route("/").post(friendsController.showFriends)


module.exports = router;