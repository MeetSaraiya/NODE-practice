require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const RegisterController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Users Email already exists",
      });
    }

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await User.create({
        email,
        password: hashedPass,
        role: "user",
      });

      if (newUser) {
        res.status(201).json({
          success: true,
          message: "Users created successfully",
          data: newUser,
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Users creation failed",
        Error: err,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      const result = bcrypt.compareSync(password, emailExist.password);
      if (result) {
        //gen jwt and assign it in res
        const token = await jwt.sign(
          {
            userId: emailExist._id,
            userEmail: email,
            userRole: emailExist.role,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30m" }
        );
        if (token) {
          return res.status(201).json({
            status: true,
            message: "User Logged in successfully",
            token: token,
          });
        } else {
          return res.status(404).json({
            status: false,
            message: "token generation failed",
          });
        }
      } else {
        return res.status(404).json({
          status: false,
          message: "Password is wrong , please enter correct password",
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message:
          "email is wrong and it dosen't exist , please enter correct password",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const changePasswordController = async (req, res) => {
  try {
    currentUserId = req.userInfo.userId;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(currentUserId);
    if (!user){
      return res
        .status(404)
        .json({ success: false, message: `user not found` });
    }
    const result = bcrypt.compareSync(oldPassword, user.password);
    if(!result){
      return res
        .status(405)
        .json({ success: false, message: `credentials not matching` });
    }
    //correct userit is confimed
    const saltRounds = 10;
    const newHashedPassword =await bcrypt.hash(newPassword,saltRounds);
    user.password = newHashedPassword;
    await user.save();
    
    return res
    .status(200)
    .json({ success: true, message: `password changed successfully ` });

  } catch (error) {
    console.error(error);
  }
};
module.exports = { RegisterController, LoginUser, changePasswordController };
