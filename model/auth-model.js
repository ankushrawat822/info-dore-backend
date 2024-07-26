const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: false
    },
    razorpay_payment_id: {
        type: String,
        required: false
    },
    razorpay_signature: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date ,
        required : false,
        default : Date.now

    },
    payment : [ paymentSchema ]
    
})

module.exports = mongoose.model('User', userSchema)