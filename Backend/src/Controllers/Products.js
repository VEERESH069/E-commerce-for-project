const {Router} = require('express');
const { default: productmodel } = require('../Model/productmodel');
const productrouter = Router();
productrouter.get('/',(req,res)=>{
    res.send('Products router');
});
productrouter.post('/',(req,res)=>{
    const {name,description,price,stock,email,img,category,tag}=req.body;
    const images = req.files.map(file => file.path);
    try{
        const seller = await productmodel.findOne({email:email});
        if(!seller){
            return res.status(400).json({message:'Seller not found'});
        }
        if(images.length === 0){
            return res.status(400).json({message:'Please upload atleast one image'});
        }
        await productmodel.create({
            name:name,
            description:description,
            price:price,
            stock:stock,
            email:email,
            images:images,

    })
}catch(err){
    console.log(err);
    res.status(500).json({message:'Internal server error'});
};
});
module.exports = productrouter;