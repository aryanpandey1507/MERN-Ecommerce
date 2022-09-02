const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User= require('../models/userModel');
const Product = require('../models/productModels'); 
const sendToken = require("../utils/JWTtoken");
const sendEmail= require('../utils/sendEmail');
const crypto = require('crypto'); 
const cloudinary = require('cloudinary');


//register a user
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
        folder:"avatars",
        width:150,
        crop:"scale",
    })

    const {name, email , password} = req.body;
    
    const user= await User.create({
        name, 
        email,  
        password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },

        })

     sendToken(user,201,res);

    
});


//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{

    const {email , password} = req.body;
   

    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter email and password" , 400));
    }

    const user = await User.findOne({email}).select("+password");
    //console.log(user);

    if(!user)
    {
        return next(new ErrorHandler("Invalid Email or password",401));
    }

    const isPasswordMatched=  await user.comparePassword(password);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid Email or password",401));
    }



    sendToken(user,200 , res);


})



//Logout user

exports.logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:"true",
        message:"Logged out"
    })
})


//Forget Password 

exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{

    const user= await User.findOne({email:req.body.email});

    if(!user)
    {
        return next(new ErrorHandler("User not found",404));
    }


    //getting the token
   const resetToken= user.getResetPasswordToken();

   await user.save({validateBeforeSave: false});

   const resetPasswordUrl =`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

   const message= `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested the mail then , kindly ignore.`;

   try{

    await sendEmail({

        email:user.email,
        subject: 'Ecommerce Password Recovery',
        message,

    });

    res.status(200).json({
        success:true,
        message: `Email sent to ${user.email} successfully.`
    })

   }catch(err)
   {
       user.resetPasswordToken=undefined;
       user.resetPasswordExpire=undefined;

       await user.save({validateBeforeSave: false});

       return next(new ErrorHandler(err.message ,500));
   }


})


//Reset Password
exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

    
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    

    const user = await User.findOne({

        resetPasswordToken:resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });

    

    
    if(!user)
    {
        return next(new ErrorHandler("Reset password Token is invalid or expired",400));
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password= req.body.password;

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200 , res);
});

//Getting the user details.
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{


    
    const user =await User.findById(req.user.id)
   
    res.status(200).json({
        success:true,
        user,
    });

});




//Updating the password
exports.UpdatePassword = catchAsyncErrors(async (req,res,next)=>{


    
    const user =await User.findById(req.user.id).select("+password");
    

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    console.log(isPasswordMatched);
   

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newPassword!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("password does not match",400));
    }

    user.password= req.body.newPassword;

    await user.save();

    sendToken(user , 200 , res);

});

//Updating the profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
    

    const newUserData= {
        name:req.body.name,
        email:req.body.email,   
    }
    

    if(req.body.avatar != undefined)
    {
        
        const user= await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
            folder:"avatars",
            width:150,
            crop:"scale",
        })

        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    }


    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user

    }); 

});


//Get ALL Users (Admin)

exports.getAllUsers = catchAsyncErrors(async (req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
});

//get details of single user( admin)
exports.getOtherUser = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user
    })
});




//Updating the user role --admin
exports.updateRole = catchAsyncErrors(async (req,res,next)=>{
    
    const newUserData= {
        name:req.body.name,
        email:req.body.email,   
        role:req.body.role
    }

    

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user,

    }); 

});



//Deleting the user --admin
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{
   

    const user = User.findById(req.params.id);
    console.log(user);
   //Removing the cloudinary 

   if(!user)
   {
      return next(new ErrorHandler(`User does not exist ${req.params.id}`,404))
   }

   await user.deleteOne();
 

    res.status(200).json({
        success:true,
        message:"User Deleted successfully"

    }); 

});



//Create New Review or update the reviews

exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{

    const {rating , comment , productId} = req.body;

    const review ={
        user:req.user.id,
        name:req.user.name,
        rating: Number(rating),
        comment:comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString())

    if(isReviewed)
    {

        product.reviews.forEach((rev)=>{

            if((rev)=> rev.user.toString()===req.user._id.toString())
            {
                rev.rating=rating,
                rev.comment=comment
            }

        }); 
      
    }
    else
    {
        product.reviews.push(review);
        product.numofReviews=product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    })

    product.ratings= avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })


});


//Get all reviews of a single product

exports.getProductReviews= catchAsyncErrors(async (req,res,next)=>{

    const product = await Product.findById(req.query.id);

    if(!product)
    {
        return next(new ErrorHandler("Product not found" ,404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
});


//Delete  reviews

exports.DeleteReviews= catchAsyncErrors(async (req,res,next)=>{

    
    const product = await Product.findById(req.query.productId);
    
    

    if(!product)
    {
        return next(new ErrorHandler("Product not found" ,404));
    }


    const reviews= product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());

    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })

    
    let ratings=0;
    if(reviews.length==0)
    {
        ratings= 0;

    }
    else
    {
       ratings=avg/reviews.length;
    }
    
    //console.log(ratings);
    
    const numofReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numofReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
});




