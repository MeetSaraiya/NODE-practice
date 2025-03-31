const express = require("express");
const router = express.Router();
const {
  AdminPageAccess,
  HasHomePageAccess,
} = require("../middelwear/authMiddleWear");
const {
  uploadImageController,
  fetchImages,
  deleteImageController,
} = require("../controllers/cloudinary-controller");

const uploadMiddlewear = require("../middelwear/upload-image-middelwear");

router.post(
  "/upload-image",
  HasHomePageAccess,
  AdminPageAccess,
  uploadMiddlewear.single("image"),
  uploadImageController
);

router.get("/get-images", HasHomePageAccess, fetchImages);

router.delete("/delete-image/:id",HasHomePageAccess,deleteImageController);

module.exports = router;
