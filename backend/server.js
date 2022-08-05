const app = require('./app');
const dotenv=require('dotenv');
const connectDB = require('./config/database');
const path = require('path');
const cloudinary = require('cloudinary');

//handling uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to uncaught exception..');
    process.exit(1)
})
 


dotenv.config({path:path.join(__dirname ,'config','config.env' )});
connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const server = app.listen(process.env.PORT,()=>{
    console.log(`listening at http://localhost:${process.env.PORT}`);

}) 


//Unhandles promise rejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection ...');
    server.close(()=>{
        process.exit(1);
    });
    
})