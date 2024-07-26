
// import Razorpay from 'razorpay'
const Razorpay = require("razorpay")
// import 'dotenv/config.js'
// import crypto from 'crypto'
const crypto = require('crypto')

// import payment from '../model/paymentSchema.js'
const User = require("../model/auth-model.js")

const razorpayInstance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_SECRET_KEY
 })


const getPayment = async (req , res)=>{

    try {
        res.json({msg : "payment details"})
    } catch (error) {
        console.log(error)
    }
}


// order api
const razorpay_order = async (req , res)=>{
    const {amount} = req.body
    try {
        const options = {
            amount : Number(amount * 100),
            currency : 'INR',
            receipt :  crypto.randomBytes(10).toString("hex")
        }

        razorpayInstance.orders.create(options, (err , order)=>{
            if(err){
                console.log(err)
                return res.status(500).json( {msg : "something went wrong"})

            }else{
                console.log(order)
                res.status(200).json({data : order})
            }
        })


        // res.json({msg : "payment details"})
    } catch (error) {
        console.log(error)
    }
}


// verify api
const razorpay_verify = async (req , res)=>{
    const { email , razorpay_order_id , razorpay_payment_id , razorpay_signature } = req.body
    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id

        
        const expectedSign = crypto.createHmac("sha256" , process.env.RAZORPAY_SECRET_KEY)
        .update(sign.toString())
        .digest('hex')

        const isAuthentic = expectedSign === razorpay_signature

        // saving details in mongodb
        
        if( isAuthentic ){

            const user = await User.findOne({ email: email })

            if (user) {  
                const newPayment = {  
                  razorpay_order_id,
                  razorpay_payment_id,
                  razorpay_signature
                };
            
                user.payment.push(newPayment); 
                await user.save()
              }else{
                throw new Error('User not found');

                // NOTE TODO : store the payment details at least somewhere safe, even if user not found.
              }

             
        }
      

         res.json({msg : "payment successfull"})

    } catch (error) {
        console.log(error)
    }
}

 
module.exports = {
     razorpay_order , razorpay_verify , getPayment
}