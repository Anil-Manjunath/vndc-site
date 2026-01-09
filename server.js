const express = require("express");
const Razorpay = require("razorpay");
const path = require("path");

const app = express();

app.use(express.static("public"));

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET_KEY"
});

app.get("/create-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: 14900,
    currency: "INR",
    receipt: "receipt_001"
  });
  res.json(order);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
