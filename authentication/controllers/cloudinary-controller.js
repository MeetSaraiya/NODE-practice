require("dotenv").config();
const Image = require("../models/Image");
const fs = require("fs");
const cloudinary = require("../config/cloudinary-config");
const { uploadImage } = require("../helper/cloudinary-helper");

const uploadImageController = async (req, res) => {
  if (!req.file) {
    return res.status(500).json({
      success: false,
      message: "File missing!!!!",
    });
  }
  try {
    const { url, publicId } = await uploadImage(req.file.path);
    if (url && publicId) {
      await Image.create(url, publicId, req.userInfo.userId);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "File uploading failed!!!!",
    });
  }
};
