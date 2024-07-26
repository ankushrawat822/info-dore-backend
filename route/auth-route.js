const express = require("express")
const { createUser, checkUser } = require("../controller/auth-controller")
const router = express.Router()

router.post('/save-user-mongodb' , createUser)

router.post('/check-user', checkUser)

module.exports = router