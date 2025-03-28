const cloudinary = require("../config/cloudinary-config");

const uploadImage = async (pathToImage) => {
  try {
    const result = await cloudinary.uploader.upload(pathToImage);
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Error while uploading to cloudinary");
  }
};

module.exports = { uploadImage };
