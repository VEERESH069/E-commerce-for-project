const express=require('express');
const connectDB = require('./src/Database/db');
const app=express();

require('dotenv').config({
    path:'./src/config/.env'
});

const PORT=process.env.port || 5000;
const url=process.env.db_url;

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/orders', orderRoutes);


app.listen(PORT,async()=>{

    try {
        await connectDB(url);
        console.log(`Server is running on port ${PORT}`);
    }
    catch(err){
        console.log(err);
    }
});