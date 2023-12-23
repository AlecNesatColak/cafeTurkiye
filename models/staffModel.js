const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please enter your user id!"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name!"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number!"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address!"],
    },
    specialization: {
      type: String,
      required: [true, "Please enter your specialization!"],
    },
    experience: {
      type: String,
      required: [true, "Please enter your experience!"],
    },
    workHours: {
      type: String,
      required: [true, "Please enter your work hours!"],
    },
    timings: {
      type: Array,
      required: [true, "Please enter your from time!"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Staffmodel = mongoose.model("staff", staffSchema);

module.exports = Staffmodel;
