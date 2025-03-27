const {Router} = require('express');
const orderrouter= Router();
const user=require('../Model/userModel');
const { error } = require('node:console');


orderrouter.post('/place', auth ,async(req,res)=>{
    try{
        const {email} = req.user
        const {orderItems,shippingAddress}=req.body;
        if(!email){
            return res.status(400).json({message:"Please provide the email"});
        }
        if(!orderItems || !Array.isArray(orderItems) || orderItems.length===0){
            return res.status(400).json({message:"Please provide the order items"});
        }
        if(!shippingAddress){
            return res.status(400).json({message:"Please provide the shipping address"});
        }
        const user = await user.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const totalAmount = orderItems.reduce((sum, item)=> sum + item.price*item.quantity, 0);

        const paymentData = {
            intent:'sale',
            payer:{payment_method: 'paypal'},
            transactions: [{amount: {total : totalAmount.tofixed(2), currency:"INR"}}],
            redirect_urls:{return_url: 'http://localhost:3000/success', cancel_url:'http://localhost:3000/cancel'}
        }

        paypal. payment.create(paymentData,async(err,payment)=>{
            const orderpromise = orderItems.map(async(item)=>{
                const order = new orders({
                    userId:user._id,
                    orderItems :[item],
                    shippingAddress,
                    totalAmount,
                    paymentId:payment.id
                });
                return order.save();
            })
            const orders = await Promise.all(orderpromise);
        })
       
        const arr = user.cart
        arr.splice(0, arr.length)
        res.status(201).json({message:'orders place and cart cleared successfully', orders});
    }
    catch(err){
        console.log('Error placing orders', err)
        res.status(500).json({message: error.message})
    }
})

orderrouter.get('/getorder', auth, async(req, res)=>{
    try{
        const email = req.user;
        if(!email){
            return res.status(404).json({message:'not found'})
        }
        const orderhistory = await orders.find({email})
        console.log(orderhistory)
        res.status(200).json({message :' placed successfully'})
    }catch(err){
        console.log(err)
    }

})

orderrouter.patch('/cancel-order/:orderId', auth, async(req, res)=>{
    try{
        const {orderId} = req.params;
       
        const mail = req.user;
        if(!orderId){
            return res.status(404).json({message:'order not found'})
        }
        const order = await orders.findOne({_id:orderId})
        if(!order){
            return res.status(404).json({message:'order not found'})
        }
        order.orderstatus == ['cancelled']
        await order.save();
           
       
        if(order.orderstatus == ['delivered']){
            return res.status(400).json({message:'order already delivered'})
        }
       
    }catch(err){
        console.log(err)
        res.status(500).json({message: error.message})
    }
});

orderrouter('/verify-payment', auth, async(req, res)=>{
    try{
        const {orderId} = req.params;
       paypal.payment.get(orderId, async(error, payment)=>{
        if(error){
            console.log(error)
            return res.status(404).json({message:'payment not found'})
        }
        if(payment.status !== 'approved'){
            return res.status(400).json({message:'payment not approved'})
        }
        await orders .findByIdAndUpdate(orderId, {orderStatus:['paid']})
       }
    )

    }catch(err){
        console.log(err)
    }
})
module.exports=orderrouter;
