
// import express from 'express'
const express = require("express")
const { addFeedback, getAllFeedback } = require("../controller/feedbackController")

const router = express.Router()

router.get("/get-feedback" , getAllFeedback  )
router.post("/add-feedback" , addFeedback)



module.exports = router