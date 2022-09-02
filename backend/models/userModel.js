const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const crypto = require('crypto');

const userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        maxlength:[30 , "Name cannot exceed 30 characters."],
        minlength:[4 ,"NAme should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true , "Enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true , "Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
            },
        url:{
            type:String,
        },
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },

    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre('save',async function(next){

    if(!this.isModified("password"))
    {
        next();
    }

    this.password= await bcrypt.hash(this.password,10);
})


//JWT token

userSchema.methods.getJWTtoken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


//Comparing password

userSchema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword , this.password);
}


//GENERATING PASSWORD RESET TOKEN
userSchema.methods.getResetPasswordToken= function(){

    const resetToken= crypto.randomBytes(20).toString("hex");

    //Hashing and adding to user schema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire= Date.now()+15*60*1000;

    return resetToken;
}

module.exports=mongoose.model("User",userSchema);