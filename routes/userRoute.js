const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .send({ msg: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ msg: "Passwords do not match", success: false });
    }

    const newUser = new User(req.body);

    await newUser.save();
    res
      .status(200)
      .send({ msg: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ msg: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ msg: "Incorrect password", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        msg: "Logged in successfully",
        success: true,
        data: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({ msg: "User not found", success: false });
    } else {
      return res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "Internal server error", success: false });
  }
});

module.exports = router;
