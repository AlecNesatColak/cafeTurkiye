const express = require("express");
const router = express.Router();
const Drink = require("../models/drinkModel");
const Order = require("../models/orderModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const exisitingOrderName = await Order.findOne({
      orderName: req.body.orderName,
    });
    if (exisitingOrderName) {
      return res
        .status(400)
        .json({ msg: "Order already exsists", success: false });
    }
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json({ msg: "Order created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating order", success: false });
  }
});

router.post("/add-to-order", authMiddleware, async (req, res) => {
  try {
    const { userId, orderName, drinkId, quantity } = req.body;

    // Find the user's order
    let order = await Order.findOne({ userId, orderName });

    // If the order doesn't exist, create a new one
    if (!order) {
      order = new Order({
        userId,
        orderName,
      });
    }

    // Find the selected drink
    const drink = await Drink.findById(drinkId);

    // If the drink doesn't exist, return an error
    if (!drink) {
      return res.status(404).json({ msg: "Drink not found", success: false });
    }

    // Check if the drink is already in the order
    const existingDrink = order.drinks.find((item) =>
      item.drink.equals(drink._id)
    );

    // If the drink is already in the order, update the quantity
    if (existingDrink) {
      existingDrink.quantity += quantity || 1; // Default to 1 if quantity is not provided
    } else {
      // If the drink is not in the order, add it with the specified quantity
      order.drinks.push({
        drink: {
          _id: drink._id,
          drinkName: drink.drinkName,
          drinkPrice: drink.drinkPrice,
          // Add other necessary properties here if needed
        },
        quantity: quantity || 1, // Default to 1 if quantity is not provided
      });
    }

    // Update the total price (assuming you have a totalPrice field in your Order model)
    order.totalPrice += drink.drinkPrice * (quantity || 1); // Default to 1 if quantity is not provided

    // Save the order
    await order.save();

    // Use Order.findById to get the updated order instance
    const orders = await Order.find({ userId }).populate("drinks.drink");

    res.status(200).json({ data: orders, success: true });
  } catch (error) {
    console.error("Error adding drink to order:", error);
    res
      .status(500)
      .json({ msg: "Error adding drink to order", success: false });
  }
});

router.get("/all-orders", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const orders = await Order.find({ userId }).populate("drinks.drink");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ msg: "Error fetching orders", success: false });
  }
});

router.delete("/delete-drink-from-order", authMiddleware, async (req, res) => {
    try {
        
        const drinkToDelete = await Order.findOneAndDelete({ userId: req.body.userId, orderName: req.body.orderName, "drinks._id": req.body.drinkId });
        res.status(200).json({ msg: "Drink deleted from order successfully", success: true });
    } catch (error) {
        console.error("Error deleting drink from order:", error);
        res.status(500).json({ msg: "Error deleting drink from order", success: false });
    }
}
)

module.exports = router;

