const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema(
    {
        drinkName: {
        type: String,
        required: [true, "Please enter your drink name!"],
        },
        drinkPrice: {
        type: String,
        required: [true, "Please enter your drink price!"],
        },
        drinkDescription: {
        type: String,
        required: [true, "Please enter your drink description!"],
        },
    },
    {
        timestamps: true,
    }
    );

const Drinkmodel = mongoose.model("drink", drinkSchema);

module.exports = Drinkmodel;