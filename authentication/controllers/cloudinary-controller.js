const Image = require("../models/Image");
const fs = require("fs");
const cloudinary = require("../config/cloudinary-config");
const { uploadImage } = require("../helper/cloudinary-helper");
const { log } = require("console");

const uploadImageController = async (req, res) => {
  console.log("File path:", req.file.path);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File missing!!!!",
        userInfo: req.userInfo,
      });
    }
    console.log("line 16-cloud-controller");
    const { url, publicId } = await uploadImage(req.file.path);
    console.log("line 18-cloud-controller");

    if (url && publicId) {
      uploadedImage = await Image.create({
        url,
        publicId,
        uploadedBy: req.userInfo.userId,
      });
    }

    res.status(201).json({
      success: true,
      message: "Imaged uploaded successfully",
      image: uploadedImage,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      message: "File uploading failed!!!!",
    });
  }
};

const fetchImages = async (req, res) => {
  try {
    const totalImages= await Image.countDocuments();
    const limit = parseInt(req.query.limit || 2);
    const page = parseInt(req.query.page || 2);
    const skip = (page-1)*limit;
    const totalPages = Math.ceil(totalImages/limit);

    const sortBy = req.query.sortBy || "createdBy";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const imgs = await Image.find().sort(sortObj).skip(skip).limit(limit);
    return res.status(200).json({
      success: true,
      data: imgs,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteImageController = async (req, res) => {
  try {
    const imgId = req.params.id;
    const image = await Image.findById(imgId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: `image does not exists`,
      });
    }
    const uploadedId = image.uploadedBy.toString();
    const publicIdofImage = image.publicId;
    const currentUser = req.userInfo.userId;
    if (uploadedId != currentUser) {
      return res.status(500).json({
        success: false,
        message: `cannot delete image since you have not uploaded this image`,
      });
    }
    await cloudinary.uploader.destroy(publicIdofImage);
    await Image.findByIdAndDelete(imgId);
    return res.status(200).json({
      success: true,
      message: `image deleted successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadImageController, fetchImages, deleteImageController };
