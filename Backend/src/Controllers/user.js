const {Router}= require("express");
const userModel = require("../Model/userModel");
const { upload } = require("../../multer");
const {bcrypt} = require("bcrypt");
const userrouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./src/config/.env" });

const secret = process.env.private_key;

userrouter.post("/create-user",upload.single("file"), async(req,res)=>{
    const {name, email, password} = req.body;
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // const filename = req.file.filename ; 
      // const fileUrl = path.join(filename);

      bcrypt.hash(password, 10, async function(err, hash) {
      
      await userModel.create({
        name:name,
        email:email,
        password: hash,
        // avatar:fileUrl
      })
    })

console.log(user);
});

userrouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const check = await userModel.findOne({email:email});
    console.log(check);

    if (!check) {
        return res.status(400).json({message: "User not found"});
    }

    bcrypt.compare(password, check.password, function(err, result){
      if (err) {
        return res.status(400).json({message: "Invalid bcrypt compare"});
      }
      if (result) {

        jwt.sign({email:email},xyz,(err,token)=>{
          if (err) {
            return res.status(400).json({message: "Invalid jwt"});
          }
          console.log(token);
          res.status(200).json({token:token});
        })


      }
      else {
        return res.status(400).json({message: "Invalid password"});
      } 
    })

});

userrouter.post('/add-address',auth,async(req,res) =>{
  const {email} = req.body
  try{
    const user = await userModel.findOne({email:email})
    if(!user){
      return res.status(400).json({message:"User not found"})
    }
    res.status(200).json({message:"Successfully Received",user:user.addressess})
  }
catch (err){
  console.log("error in get address",res);
}

})
const express = require('express');
const { createOrder } = require('../Controllers/orderController');

const router = express.Router();

// Route to create a new order
router.post('/create-order', createOrder);

module.exports = router;


module.exports = userrouter;