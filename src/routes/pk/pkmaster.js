"use strict";

var path = require("path");
var fs = require("fs");

// var thankyouModel = require("../model/thankyou");
// var ec = require("../lib/error_consts");
// var utils = require("../lib/utils");
  
var getpkApi = require("../../api/pkmaster");
// var ec = require("../../lib/error_consts");
const xlsx = require('xlsx');
const pkmaster = require("../../model/pkmater");
const { Console } = require("console");

// const data = require("../../../public")

var getintouch = {

      addOnSubmit: async function (req, res, next) {
        
        if (!req.body) {
            return next(ec.appError({
                status: ec.UNDEFINED_DATA,
                message: "no data provided."
            }));
        }
    
        var params = req.body;

        if(req.files){

          if (req.files.image && req.files.image.name) {

              params["image"] = req.files.image;
          }

          if (req.files.video && req.files.video.name) {
              params["video"] = req.files.video;
          }
        }
        
        getpkApi.adddatafromform(params, function (err, data) {
          if (err) {
            return next(err);
          }
          res.json(data);

        });
      },


      add: async function (req, res, next) {
        
        if (!req.body) {
            return next(ec.appError({
                status: ec.UNDEFINED_DATA,
                message: "no data provided."
            }));
        }
    
        var params = req.body;

        if(req.files){

          if (req.files.image && req.files.image.name) {

              params["image"] = req.files.image;
          }

          if (req.files.video && req.files.video.name) {
              params["video"] = req.files.video;
          }
        }
        
        getpkApi.add(params, function (err, data) {
          if (err) {
            return next(err);
          }
          res.json(data);

        });
      },

      fetchAll: function (req, res, next) {
        getpkApi.fetchAll(function (err, data) {
            if (err) {
              return next(err);
            }
      
            res.json(data);
          });
     },

     fetchPkDurga: function (req, res, next) {
      console.log(req.query,"request");
      getpkApi.fetchPkDurga(req.query,function (err, data) {
          if (err) {
            return next(err);
          }
    
          res.json(data);
        });
   },


      exportcsv: function (req, res, next) {
        var host = req.get('host');

        getpkApi.fetchAll(function (err, data) {
          if (err) {
          res.json(data);

          }
    

          let fetchdata = data

          let csv_file_data = [];
          // let baseurl = window.location.origin

              if (fetchdata) {

                for ( var i=0; i<fetchdata.length;i++) {

                if(i== fetchdata.length) return ;
                    let t_data = {};

                t_data["Name"] = fetchdata[i].name;
                t_data["Age"] = fetchdata[i].age;
                t_data["City"] = fetchdata[i].city;
                t_data["Pincode"] = fetchdata[i].pincode;
                t_data["Gender"] = fetchdata[i].gender;
                t_data["Adderss"] = fetchdata[i].address;
                t_data["Phone"] = fetchdata[i].phone;
                t_data["Email"] = fetchdata[i].email;

                if(fetchdata[i].image ){
                  t_data["Image"] = host +fetchdata[i].image;
                }else{
                  t_data["Image"] = "NA"
                }
                
                if(fetchdata[i].video){
                  t_data["Video"] = host + fetchdata[i].video;
                }else{
                  t_data["Video"] = "NA"
                }
                
                t_data["Created_At"] = fetchdata[i].createdAt;

                // console.log("t_data", t_data);
                csv_file_data.push(t_data);

                
                }

            }

      // console.log("csv file data", csv_file_data)

        let workBook = xlsx.utils.book_new();
        const workSheet = xlsx.utils.json_to_sheet(csv_file_data);
        
        xlsx.utils.book_append_sheet(workBook, workSheet, `response`);

        const filename = 'Data-' + Date.now() + '.xlsx';

        let full_file_path = `public/${filename}`;

        xlsx.writeFile(workBook, full_file_path);

        return res.download(path.join(__dirname, '../../../public/'+filename), filename); 

        });
      },


      exportPkDurga: function (req, res, next) {
        var host = req.get('host');

        console.log("params", req.params);
        let params ={}
        params['form']= req.params
        getpkApi.fetchPkDurga(params,function (err, data) {
          if (err) {
          res.json(data);

          }
    console.log("data", data);

          let fetchdata = data

          let csv_file_data = [];

              if (fetchdata) {

                for ( var i=0; i<fetchdata.length;i++) {

                if(i== fetchdata.length) return ;
                    let t_data = {};

                t_data["Name"] = fetchdata[i].name;
                t_data["Age"] = fetchdata[i].age;
                t_data["City"] = fetchdata[i].city;
                t_data["Pincode"] = fetchdata[i].pincode;
                t_data["Gender"] = fetchdata[i].gender;
                t_data["Adderss"] = fetchdata[i].address;
                t_data["Phone"] = fetchdata[i].phone;
                t_data["Email"] = fetchdata[i].email;

                if(fetchdata[i].image ){
                  t_data["Image"] = host +fetchdata[i].image;
                }else{
                  t_data["Image"] = "NA"
                }
                
                if(fetchdata[i].video){
                  t_data["Video"] = host + fetchdata[i].video;
                }else{
                  t_data["Video"] = "NA"
                }
                
                t_data["Created_At"] = fetchdata[i].createdAt;

                // console.log("t_data", t_data);
                csv_file_data.push(t_data);

                
                }

            }

      // console.log("csv file data", csv_file_data)

        let workBook = xlsx.utils.book_new();
        const workSheet = xlsx.utils.json_to_sheet(csv_file_data);
        
        xlsx.utils.book_append_sheet(workBook, workSheet, `response`);

        const filename = 'Data-' + Date.now() + '.xlsx';

        let full_file_path = `public/${filename}`;

        xlsx.writeFile(workBook, full_file_path);

        return res.download(path.join(__dirname, '../../../public/'+filename), filename); 

        });
      },

      exportPkDurgaDateExport: function (req, res, next) {
        var host = req.get('host');

        // console.log("params", req.query.form);
        let params ={}
        params['form']= req.query.form
        params['startDate'] = req.query.startDate
        params['endDate'] = req.query.endDate
        getpkApi.fetchPkDurgaToDate(params,function (err, data) {
          if (err) {
          res.json(data);

          }
    

          let fetchdata = data

          // console.log("fetch data", fetchdata);

          let csv_file_data = [];

              if (fetchdata) {

                for ( var i=0; i<fetchdata.length;i++) {

                if(i== fetchdata.length) return ;
                    let t_data = {};

                t_data["Name"] = fetchdata[i].name;
                t_data["Age"] = fetchdata[i].age;
                t_data["City"] = fetchdata[i].city;
                t_data["Pincode"] = fetchdata[i].pincode;
                t_data["Gender"] = fetchdata[i].gender;
                // t_data["Adderss"] = fetchdata[i].address;
                t_data["Phone"] = fetchdata[i].phone;
                t_data["Email"] = fetchdata[i].email;

                if(fetchdata[i].image ){
                  t_data["Image"] = host +fetchdata[i].image;
                }else{
                  t_data["Image"] = "NA"
                }
                
                if(fetchdata[i].video){
                  t_data["Video"] = host + fetchdata[i].video;
                }else{
                  t_data["Video"] = "NA"
                }
                
                t_data["Created_At"] = fetchdata[i].createdAt;

                // console.log("t_data", t_data);
                csv_file_data.push(t_data);

                
                }

            }

      // console.log("csv file data", csv_file_data)

        let workBook = xlsx.utils.book_new();
        const workSheet = xlsx.utils.json_to_sheet(csv_file_data);
        
        xlsx.utils.book_append_sheet(workBook, workSheet, `response`);

        const filename = 'Data-' + Date.now() + '.xlsx';

        let full_file_path = `public/${filename}`;

        xlsx.writeFile(workBook, full_file_path);

        return res.download(path.join(__dirname, '../../../public/'+filename), filename); 

        });
      }

}


module.exports = getintouch;