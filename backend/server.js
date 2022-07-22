const app = require('./app');
const dotenv=require('dotenv');
const connectDB = require('./config/database');
const path = require('path');

//handling uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to uncaught exception..');
    process.exit(1)
})
 

console.log(path.join(__dirname ,'config','config.env' ));
dotenv.config({path:path.join(__dirname ,'config','config.env' )});
connectDB();


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