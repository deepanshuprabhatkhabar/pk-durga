"use strict";

var mongoose = require("mongoose");
var ec = require("../lib/error_consts");
//console.log(cons.year);
var Schema = mongoose.Schema;

var pkDataSchema = new mongoose.Schema({
    name:{ type: String },
    age:{ type: String },
    city:{ type: String },
    pincode:{ type: String },
    gender:{ type: String },
    address:{ type: String },
    phone:{ type: String },
    email:{ type: String },
    image:{ type: String },
    video:{ type: String },
},
    { timestamps: true 
});
var pkmasterModel = mongoose.model("pkData", pkDataSchema);

var pkmaster = {

    create:async function (params, cb) {
        if (!params) {
          return cb(
            ec.appError({
              status: ec.INVALID_PARAM,
              message: "No data provided",
            })
          );
        }else{
  

          // let duplicateemail = await pkmasterModel.findOne({email: params.email}).lean()

          // if(duplicateemail){
          //   return cb(
          //     ec.appError({
          //       status: ec.DB_ERROR,
          //       message: "DB EMAIL_EXISTS",
          //     })
          //   );
          // }
    

      //   //  console.log({"rrrrr": params})
      //   let duplicatephone = await pkmasterModel.findOne({phone: params.phone}).lean()
      // // console.log("dup",JSON.stringify(duplicatephone) );

      // if(duplicatephone){
      //   return cb(
      //     ec.appError({
      //       status: ec.DB_ERROR,
      //       message: "DB PHONE_EXISTS",
      //     })
      //   );
      // }
      // }
        }
    
        console.log("params", params);
        pkmasterModel.create(params, function (err, result) {
          if (err) {
            console.log("error",err);
            return cb(
              ec.appError({
                status: ec.DB_ERROR,
                message: "DB Fetch Error",
              })
            );
          }
          console.log("result", result);
    
          return cb(err, result);
        });
      
      },

      fetchAll: function (cb) {
        pkmasterModel.find(function(err, result) {
          if (err) {
              console.log(err);
              return cb(ec.appError({
                  status: ec.DB_ERROR,
                  message: "DB Fetch Error"
              }));
          }
          return cb(err, result);
  
      });
      },  

    //   fetchById: function(params, cb) {

    //     if(params){
          
    //     }
    //     pkmasterModel.findone(id, function(err, result) {
    //        if (err) {
    //             return cb(err);
    //         }
    //         return cb(err, result);
    //     });
    // },


    }

    module.exports=pkmaster;