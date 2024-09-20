"use strict";
var request = require("request");
var common = require("./common");
var moment = require("moment");

var form = {
  

  manage: function (req, res, next) {
    common
      .apiRequest(
        req.protocol + "://" + req.get("host") + "/api/pk-durga?form="+ req.query.form,
        req.headers.cookie,
        "GET"
      )
      .then((result) => {
        res.render("cms/manage.ejs", {
          formdata: result,
          moment: moment,
          formName : req.query.form
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("cms/enquiry.ejs");
      });
  },

  manageForm: function (req, res, next) {
    common
      .apiRequest(
        req.protocol + "://" + req.get("host") + "/api/pkmaster",
        req.headers.cookie,
        "GET"
      )
      .then((result) => {
        res.render("cms/manage-formData.ejs", {
          formdata: result,
          moment: moment,
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("cms/enquiry-manage.ejs");
      });
  },

  
};
module.exports = form;
