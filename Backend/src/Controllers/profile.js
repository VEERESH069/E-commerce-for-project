const {Router}= require("express");
const userModel = require("../Model/userModel");
const profilerouter = Router();
const jwt = require("jsonwebtoken");

profilerouter.get('/get-profile',async(req,res)=>{
    const {email} = req.body;
    const usermail = await userModel.findOne({email:email});
    if (!usermail){
        res.status(400).json({message:"Email not found"});

    }
 
    res.status(200).json({message:"Success user found"})
    const user = {
        name:usermail.name,
        email:usermail.email,
        password:usermail.password,
        avatar:usermail.avatar,
    }
})
