const express = require("express");
const {
  HasHomePageAccess,
  AdminPageAccess,
} = require("../middelwear/authMiddleWear");
const router = express.Router();

router.get("/welcome", HasHomePageAccess, (req, res) => {
  console.log("home page");
  res.status(200).json({ message: "Welcome to home page" });
});

router.get("/admin", HasHomePageAccess, AdminPageAccess, (req, res) => {
  console.log(req.userInfo);
  console.log("-----------------Admin page----------------------------");
  res.status(200).json({ message: "Welcome Admin" });
});

module.exports = router;
