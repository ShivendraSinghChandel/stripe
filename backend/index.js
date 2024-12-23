const express = require("express");
const Stripe = require("stripe");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: 'http://localhost:5173'  
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const paymentRoute = require("./route");
app.use("/payment", paymentRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
