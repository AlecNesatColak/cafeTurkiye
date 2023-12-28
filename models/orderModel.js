const mongoose = require('mongoose');
const Drink = require('./drinkModel'); // Adjust the path accordingly

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter your user id!"],
  },
  orderName: {
    type: String,
    required: [true, "Please enter your order name!"],
  },
  drinks: [
    {
      drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink', // Reference to the Drink model
      },
      quantity: {
        type: Number,
        required: [true, "Please enter the quantity!"],
      },
    },
  ],
}, { timestamps: true });

const Ordermodel = mongoose.model('Order', orderSchema);

module.exports = Ordermodel;