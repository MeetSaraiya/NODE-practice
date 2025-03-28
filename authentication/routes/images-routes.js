const express = require("express");
const router = express.Router();
const {
  AdminPageAccess,
  HasHomePageAccess,
} = require("../middelwear/authMiddleWear");
const {
  uploadImageController,
} = require("../controllers/cloudinary-controller");

const uploadMiddlewear = require("../middelwear/upload-image-middelwear");

router.post(
  "/upload-image",
  HasHomePageAccess,
  AdminPageAccess,
  uploadMiddlewear.single("image"),
  uploadImageController
);

module.exports = router;
