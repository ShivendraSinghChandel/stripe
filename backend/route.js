const { confirmPayment, CreatePaymentIntent } =require("./controller");

const express=require("express");
const route=express.Router();

route.post("/create-payment-intent",CreatePaymentIntent);
route.post('/confirm-payment',confirmPayment);

module.exports=route;