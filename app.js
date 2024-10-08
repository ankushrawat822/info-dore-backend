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

// vehicles data
const getAllVehicleData = require("./route/vehiclesRoutes.js")
const addDataVechiles = require("./route/vehiclesRoutes.js")
const updateVehicleAllocations = require("./route/vehiclesRoutes.js")

// building data
const getAllBuildingData = require("./route/buildingRoutes.js")
const addBuildingData = require("./route/buildingRoutes.js")
const updateBuilding = require("./route/buildingRoutes.js")
const getGeminiResult = require("./route/geminiAPI.js")
const getBuildingLongitudeAndLatitude = require("./route/buildingRoutes.js")


// feedback
const getAllFeedback = require("./route/feedbackRoutes.js")
const addFeedback = require("./route/feedbackRoutes.js")
const getAllParks = require("./route/park.js")
const addPark = require("./route/park.js")

app.use(cors())
app.use(express.json())

// roues 
app.use("/api" , authRoute)
app.use("/api" , getPayment)
app.use("/api" , verify)
app.use("/api" , order)
app.use("/api" , checkUser)


// vehicles data
app.use("/api" , getAllVehicleData )
app.use("/api" , addDataVechiles )
app.use("/api", updateVehicleAllocations)

// building data
app.use("/api" , getAllBuildingData)
app.use("/api" , addBuildingData)
app.use("/api" , updateBuilding)
app.use("/api" , getGeminiResult)
app.use("/api" , getBuildingLongitudeAndLatitude)
// feedback

app.use("/api" , getAllFeedback)
app.use("/api" , addFeedback)

// park
app.use("/api" , getAllParks)
app.use("/api" , addPark)


module.exports = app



