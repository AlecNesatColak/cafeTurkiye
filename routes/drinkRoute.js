const express = require("express");
const router = express.Router();
const Drink = require("../models/drinkModel");
const Order = require("../models/orderModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add-to-menu", authMiddleware, async (req, res) => {
  try {
    const exsisitingDrink = await Drink.findOne({
      drinkName: req.body.drinkName,
    });
    if (exsisitingDrink) {
      return res
        .status(400)
        .send({ msg: "Drink already exists", success: false });
    }
    const newDrink = new Drink(req.body);
    await newDrink.save();
    res.status(200).send({ msg: "Drink added successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error adding drink" });
  }
});

// Assuming you have a Drink model defined somewhere in your code

router.get("/all-drinks", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json({ success: true, data: drinks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error fetching drinks" });
  }
});




module.exports = router;
