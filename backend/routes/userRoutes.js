const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/getProfileData").post(userController.getProfile);
router.route("/updateProfileData").post(userController.updateProfile);
router.route("/deleteProfileData").post(userController.deleteProfile);
router.route("/updateProfilePicture").post(userController.updateProfilePicture);

module.exports = router;
