const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password!"],
    },
  },
  {
    timestamps: true,
  }
);

const Usermodel = mongoose.model("users", userSchema);

module.exports = Usermodel;
