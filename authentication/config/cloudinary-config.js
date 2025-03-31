require("dotenv").config();
var cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_cloud_name,
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret // Click 'View API Keys' above to copy your API secret
});
module.exports = cloudinary;

