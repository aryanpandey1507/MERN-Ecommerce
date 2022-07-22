const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
      name:{
          type:String,
          required:[true,'Please Enter Product name'],
          trim:true
      },
      description:{
          type:String,
          required:[true,'Please Enter Product description']
      },
      price:{
          type:Number,
          required:[true , "Enter Price"],
          maxLength:[8 , "Price can't exceeded"]
      },
      ratings:{
          type:Number,
          default:0
      },
      images:[
        {
          public_id:{
              type:String,
              required:true
          },
          url:{
              type:String,
              required:true
          },

        }
      ],
      
      category:{
          type:String,
          required:[true, 'Enter Category']
      },
      Stock:{
          type:Number,
          default:1,
          required:[true, 'Enter Stock'],
          maxLength:[4,'Cannot exceed more than 4']
      },

      numofReviews:{
          type:Number,
          default:0
      },

      reviews:
      [
        {
           user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
           },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            
            },
            comment:{
                type:String,
                required:true
            }

        }
      ],

      user:{
           type:mongoose.Schema.ObjectId,
           ref:"User",
           required:true
      },

      createdAt:{
          type:Date,
          default:Date.now,
      }



})


module.exports=mongoose.model('Product',productSchema);