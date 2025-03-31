const express = require("express");
const {
  RegisterController,
  LoginUser,
  changePasswordController
} = require("../controllers/auth-contoller");
const {HasHomePageAccess} = require('../middelwear/authMiddleWear')

router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginUser);
router.post("/change-password",HasHomePageAccess,changePasswordController);

module.exports = router;
