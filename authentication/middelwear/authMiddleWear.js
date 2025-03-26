require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

HasHomePageAccess = async (req, res, next) => {
  try {
    const semiToken = req.headers.authorization;
    const token = semiToken.split(" ")[1];
    const bd = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userEmail, userRole } = bd;
    console.log(bd);
    req.userInfo = bd;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "user verification failed , please login again",
    });
  }
};

AdminPageAccess = (req, res, next) => {
  if (req.userInfo.userRole === "admin") {
    console.log("-----------------Admin page----------------------------");
    next();
  } else {
    console.log("user is not admin");
    return res.status(404).json({
      message: "User needs admin rights to access this page",
      success: false,
    });
  }
};

module.exports = { HasHomePageAccess, AdminPageAccess };
