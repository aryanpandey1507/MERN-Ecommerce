const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIfeatures = require('../utils/apifeatures');



//  creating the product --admin
exports.createProduct= catchAsyncErrors(async (req,res,next)=>{

    req.body.user=req.user.id;

    const product = await Product.create(req.body)
    
     res.status(201).json({
        success:true,
        product
    })
})

//getting the product
exports.getAllProducts= catchAsyncErrors(async (req,res,next)=>{
    
    

    const resultPerPage=8;
    const productsCount = await Product.countDocuments();    
    


    const apifeature = new APIfeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    

    let products = await apifeature.query;

    let filteredProductCount = products.length;
    
    

    res.status(201).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount
    })
    
})


//getting the details of a single product
exports.getproduct=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    
    res.status(200).json({
        success:true,
        product
    })
})


//updating the product --admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{

    
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    
    
        product = await Product.findByIdAndUpdate(req.params.id , req.body , {new:true,runValidators:true,useFindAndModify:false});
        res.status(200).json({
            success:true,
            product
        })
    
})


//deleting the product
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted"
    })

});