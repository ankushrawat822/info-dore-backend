const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// importing db 
const connectDB = require("./config/db.js")

connectDB()



// importing auth routes
const authRoute = require("./route/auth-route.js")
const checkUser = require("./route/auth-route.js")

// importing payment routes
const getPayment = require("./route/payment.js")
const verify = require("./route/payment.js")
const order = require("./route/payment.js")


app.use(cors())
app.use(express.json())

// roues 
app.use("/api" , authRoute)
app.use("/api" , getPayment)
app.use("/api" , verify)
app.use("/api" , order)
app.use("/api" , checkUser)




module.exports = app



