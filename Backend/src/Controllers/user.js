const {Router}= require("express");
const userModel = require("../Model/userModel");
const { upload } = require("../../multer");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userrouter = Router();
require('dotenv').config({  path:'./src/config/.env'});

const secret = process.env.private_key;

userrouter.post("/create-user",upload.single('file'),async(req,res)=>{
    const {name, email, password} = req.body;
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const filename = req.file.filename ;
      const fileUrl = path.join(filename);
   
    bcrypt.hash(password, 10,async function(err, hash) {

        await userModel.create({
            name:name,
            email:email,
            password:hash,
            // avatar:fileUrl

        })

        })


});


userrouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    const check= await userModel.findOne({email:email});
        console.log(check);
    if(!check){
        return res.status(400).json({message:"User not found"});
    }

    bcrypt.compare(password,check.password , function(err, result) {
       
        if(err){
            return res.status(400).json({message:"Invalid bcrpyt compare"});
        }
        if(result){
           
            jwt.sign({email:email},secret,(err,token)=>{
                if(err){
                    return res.status(400).json({message:"Invalid jwt"});
                }
                res.setHeader('Authorization',`Bearer ${token}`);

                console.log(token);
                res.status(200).json({token:token});    
            })


        }  
        else{
            return res.status(400).json({message:"Invalid password"});
        }
    });

    userrouter.get('/profile',async (req,res) => {
        const {email} = req.query;
        if(!email){
            return res.status(400).json({message:"email cannot be empty!"})
        }
   
        try{
        const user = await userModel.findOne({email:email});
   
        if(!user){
            return res.status(404).json({message:"The user was not found"});
        }
   
        const Users = {
            name: user.name,
            email: user.email,
            phone: user.phoneNumber,
            image: user.avatarurl,
            address: user.address
        }
   
        res.status(200).json({message:"successfully recieved"});
    }
   
    catch(err){
        res.status(500).json({error:err});
    }
    })

    userrouter.post('/add-address',auth ,async (req,res) => {
        const {email, address} = req.body;
        if(!email || !address){
            return res.status(400).json({message:"email or address cannot be empty!"})
        }
   
        try{

           
                const [country, city, address1, address2, zipCode, addressType] = req.user;
           
        const user = await userModel.findOne({email:email});

        const newaddress = {
            country: country,
            city: city,
            address1: address1,
            address2: address2,
            zipCode: zipCode,
            addressType: addressType
           
        }
        if(!user){
            return res.status(404).json({message:"The user was not found"});
        }
   
        user.addresses.push(address);
        await user.save();
   
        res.status(200).json({message:"successfully added"});
    }
   
    catch(err){
        res.status(500).json(message:err);
    }
    })
   
    userrouter.get('/get-address',auth,async(req,res)=>{
        const email=req.user
        try{
         const user=await userModel.findOne({email:email})
         if(!user){
             return res.status(400).json({message:"User not found"})
         }  
         res.status(200).json({message:"successfully recieved",user:user.addresses
         })
        }
        catch(err){
              console.log("error in get address",err)    
        }
     
     
     
     })
   

})

module.exports = userrouter;
