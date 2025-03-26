const express = require("express");
const {
  RegisterController,
  LoginUser,
} = require("../controllers/auth-contoller");
router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginUser);

module.exports = router;
