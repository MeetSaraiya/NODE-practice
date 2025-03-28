const Image = require("../models/Image");
const fs = require("fs");
const cloudinary = require("../config/cloudinary-config");
const { uploadImage } = require("../helper/cloudinary-helper");

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

module.exports = { uploadImageController };
// const uploadImageController = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "File missing!!!!",
//       });
//     }

//     if (!req.userInfo || !req.userInfo.userId) {
//       return res.status(400).json({
//         success: false,
//         message: "User information is missing",
//       });
//     }

//     const { url, publicId } = await uploadImage(req.file.path);

//     if (!url || !publicId) {
//       return res.status(500).json({
//         success: false,
//         message: "Image upload failed",
//       });
//     }

//     const uploadedImage = await Image.create({
//       url,
//       publicId,
//       uploadedBy: req.userInfo.userId,
//     });

//     // Cleanup temporary file
//     // fs.unlink(req.file.path, (err) => {
//     //   if (err) {
//     //     console.error("Error deleting temporary file:", err);
//     //   }
//     // });

//     res.status(201).json({
//       success: true,
//       message: "Image uploaded successfully",
//       image: uploadedImage,
//     });
//   } catch (e) {
//     console.error("Error uploading image:", e.message || e);
//     return res.status(500).json({
//       success: false,
//       message: "File uploading failed!!!!",
//     });
//   }
// };

// module.exports = { uploadImageController };
