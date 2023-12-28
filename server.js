const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const drinkRoute = require("./routes/drinkRoute");
const orderRoute = require("./routes/orderRoute");

app.use('/api/user', userRoute);
app.use('/api/drink', drinkRoute);
app.use('/api/order', orderRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server on port ${port}`));
