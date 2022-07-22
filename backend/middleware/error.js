const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{

    err.statusCode= err.statusCode ||500;
    err.message=err.message||"Internal Server Error";

    //Wrong mongodb id format 
    if(err.name==="CastError")
    {
        const message=  `Resource not found . Invalid : ${err.path}`;
        err=new ErrorHandler(message ,400);
    }

    //Mongoose Duplicate Key (email) error
    if(err.code===11000)
    {
        const message=  `Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(message ,400);
    } 

    //JSON WEB TOKEN ERROR
    if(err.code==='JsonWebTokenError')
    {
        const message=  `JSON web token is invalid , Try again`;
        err=new ErrorHandler(message ,400);
    } 

    //JSON WEB TOKEN Expired
    if(err.code==='TokenExpiredError')
    {
        const message=  `JSON web token is expired , Try again`;
        err=new ErrorHandler(message ,400);
    } 

   
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })


    


};