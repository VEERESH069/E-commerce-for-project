const{model,Schema}=require('mongoose');


const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:[true,'is required'],
        match:[/\S+@\S+\.\S+/,'is invalid'] //email validation
    },
    img:{
        type:[String],
        default:[]
    },
    category:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now //current date
    },
    updatedAt:{
        type:Date,
        timestamps:true
    }
   

});
export default model('Product',productSchema);
 
module.export = {productSchema}; //exporting the schema