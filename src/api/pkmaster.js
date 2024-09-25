"use strict";

var path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// const { Validator } = require("node-input-validator");
var _ = require("underscore");
var moment = require('moment')
const axios = require('axios');

var masterModel = require('../model/pkmater')
var imageModel = require('../model/pkmaterimage')
var reelsModel = require('../model/pkmatervideo')
var nodemailer = require('nodemailer');
var mailFormats = require('../lib/mail_formats');

var formdata = {

    // arrow data submission form home (index.ejs) file.
    adddatafromform: async function (params, cb) {
  
        var createData = {
          name:params.name,
          age:params.age,
          city:params.city,
          pincode:params.pincode,
          gender:params.gender,
          address:params.address,   
          phone:params.phone,
          email:params.email,
        
        };

        if (params.image) {
            var file = params.image;
            let file_extension = file.name.substr(file.name.lastIndexOf('.') + 1);
           
            let filename = uuidv4() + '-' + Date.now() + '-' + params.phone + '.' + file_extension;
            console.log("filename::",filename);
            let filePath = 'public/uploads/' +  filename;
            
            // const uploaded = await fs.writeFile(filePath, file.data);

            fs.writeFile(filePath, file.data, (err) => { 
              if (err) { 
                console.log(err); 
              } 
            }); 

            // if(uploaded){console.log()}
            createData["image"] = "/static/uploads/" + filename;
        }

        if (params.video) {
          var file = params.video;
          let file_extension = file.name.substr(file.name.lastIndexOf('.') + 1);
          
          let filename = uuidv4() + '-' + Date.now() + '-' + params.phone + '.' + file_extension;
          let filePath = 'public/uploads/' +  filename;
          
          fs.writeFile(filePath, file.data, (err) => { 
            if (err) { 
              console.log(err); 
            } 
          }); 
          createData["video"] = "/static/uploads/" + filename;               
        }

        masterModel.create(createData, function (err, result) {
          if (err) {
            return cb(err);
          }
    
          return cb(err, result);
        });
    
      },
      
      fetchAll: function (cb) {
        masterModel.fetchAll(function (err, result) {
          if (err) {
            return cb(err);
          }
          return cb(err, result);
        });
      }, 


      add: async function (params, cb) {
  
        var createData = {
          name:params.name,
          age:params.age,
          city:params.city,
          pincode:params.pincode,
          gender:params.gender,
          remark:params.remark,  
          phone:params.phone,
          email:params.email,
          date:moment(Date.now()).format("YYYY-MM-DD"),
          utm_source: params.utm_source,
          utm_medium: params.utm_medium,
          utm_campaign: params.utm_campaign,
        
        };
console.log("params", params);
        if (params.image) {
            var file = params.image;
            let file_extension = file.name.substr(file.name.lastIndexOf('.') + 1);
           
            let filename = params.name + '-' + params.phone  + '-' + Date.now()+ '.' + file_extension;
            // console.log("filename::",filename);
            let filePath = 'public/uploads/' +  filename;
            
            // const uploaded = await fs.writeFile(filePath, file.data);

            fs.writeFile(filePath, file.data, (err) => { 
              if (err) { 
                console.log(err); 
              } 
            }); 

            // if(uploaded){console.log()}
            createData["image"] = "/static/uploads/" + filename;
        }

        if (params.video) {
          var file = params.video;
          let file_extension = file.name.substr(file.name.lastIndexOf('.') + 1);
          
          let filename = params.name + '-' + params.phone + '-' + Date.now() + '.' + file_extension;
          let filePath = 'public/uploads/' +  filename;
          
          fs.writeFile(filePath, file.data, (err) => { 
            if (err) { 
              console.log(err); 
            } 
          }); 
          createData["video"] = "/static/uploads/" + filename;               
        }

        // console.log('params.formName', params.formName);
        if(params.formName == "reels"){

          console.log("if condition");
          reelsModel.create(createData, function (err, result) {
            if (err) {
              return cb(err);
            }

            
var fromdetail="Trends Utsav Durga POOJA <daljeet.develop@gmail.com>"

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: 'daljeet.develop@gmail.com',
          pass: 'hmnolhlraommdmzd'
      }
    
});
   let tomail="manish.kr@weaddo.com,amit@weaddo.com, nikita@weaddo.com,amit@weaddo.com, deepshikha@weaddo.com"

   var mailOptions2 = {
    from: fromdetail,
    from_email: 'daljeet.develop@gmail.com',
    cc:'manish.kr@weaddo.com',
    to: tomail,
    subject: 'Trends Utsav DURGA POOJA Reels form submitted by:- '+params.name,
    html: mailFormats.trendsUtasv(createData, params.host),   
    };


transporter.sendMail(mailOptions2, function(error, info) {
  
    if (error) {
        console.log('error in sending welcome mail');
        console.log(error);
    } else {
        console.log('International patient email sent: ' + info.response);
    }

});

var mailOptions = {
    from: fromdetail,
    to: params.email,
    subject: 'DURGA POOJA ON REEL submitted by:- '+params.name,
    html: mailFormats.trendsUtasv(createData, params.host),
   
};

transporter.sendMail(mailOptions, function(error, info) {

    if (error) {
        console.log('error in sending welcome mail');
        console.log(error);
    } else {
        console.log('Welcome email sent: ' + info.response);
    }

});
      

          var config = {
            method: 'get',
            url: `http://164.52.195.161/API/SendMsg.aspx?uname=20140999&pass=neutral@05052014&send=PKHABR&dest=${params.phone}&msg=Congratulations! You have successfully registered for the Trends Nav Utsav Contest - NPHL (Prabhat Khabar)`,
            headers: { 
              'Cookie': 'ASP.NET_SessionId=lfzfewxmd4dfhienkermzu5b'
            }
          };
                      
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      
            return cb(err, result);
          });

        }else{
          console.log("else condition");
          imageModel.create(createData, function (err, result) {
            if (err) {
              return cb(err);
            }

            var config = {
              method: 'get',
              url: `http://164.52.195.161/API/SendMsg.aspx?uname=20140999&pass=neutral@05052014&send=PKHABR&dest=${params.phone}&msg=Congratulations! You have successfully registered for the Trends Nav Utsav Contest - NPHL (Prabhat Khabar)`,
              headers: { 
                'Cookie': 'ASP.NET_SessionId=lfzfewxmd4dfhienkermzu5b'
              }
            };
                        
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
      
            return cb(err, result);
          });
        }

       
    
      },
  
      fetchPkDurga: function (params,cb) {

        // console.log("params api page", params.form);
        if(params.form=="reels"){
          reelsModel.fetchAll(function (err, result) {
            if (err) {
              return cb(err);
            }
            return cb(err, result);
          });
        }else{
          imageModel.fetchAll(function (err, result) {
            if (err) {
              return cb(err);
            }
            return cb(err, result);
          });
        }
      
      }, 

      fetchPkDurgaToDate: function (params,cb) {

        console.log("params", params);
        if(params.form=="reels"){
          reelsModel.fetchAllPkDurgaexport(params,function (err, result) {
            if (err) {
              return cb(err);
            }
            return cb(err, result);
          });
        }else{
          console.log("to date image esle");
          imageModel.fetchAllPkDurgaToDate(params,function (err, result) {
            if (err) {
              return cb(err);
            }
            return cb(err, result);
          });
        }
      
      }, 
}


module.exports = formdata;
