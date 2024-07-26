const  {getPayment, razorpay_order, razorpay_verify} = require("../controller/payment.js")
// import express from 'express'
const express = require("express")

const router = express.Router()

router.get("/get-payment" , getPayment  )

router.post("/order" , razorpay_order)

router.post("/verify" , razorpay_verify)


module.exports = router