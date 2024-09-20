"use strict";
var request = require("request");
var common = require("./common");
var moment = require("moment");

var sidenav = {
  add: function (req, res, next) {
    res.render("cms/sidenav-add.ejs", {
      response: "",
    });
  },

  addPost: function (req, res, next) {
    console.log(req.url.split("/")[1])
    common
      .apiRequest(
        req.protocol + "://" + req.get("host") + "/api/sidenav/add",
        req.headers.cookie,
        "POST",
        req.body,
        req.files
      )
      .then((postResult) => {
        res.render("cms/sidenav-add.ejs", {
          response: "success",
          msg: "Added successfully.",
        });
      })
      .catch((err) => {
        res.render("cms/sidenav-add.ejs", {
          response: "error",
          msg: err,
        });
      });
  },

  manage: function (req, res, next) {
    common
      .apiRequest(
        req.protocol + "://" + req.get("host") + "/api/sidenav",
        req.headers.cookie,
        "GET"
      )
      .then((result) => {
        res.render("cms/sidenav-manage.ejs", {
          sidenav: result,
          moment: moment,
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("cms/sidenav-manage.ejs");
      });
  },

  edit: function (req, res, next) {
    if (!req.params || !req.params.id) {
      return next(
        ec.appError({
          status: ec.INVALID_ID,
          message: "invalid id provided.",
        })
      );
    }

    var requestData = [
      common.apiRequest(
        req.protocol +
          "://" +
          req.get("host") +
          "/api/sidenav/" +
          req.params.id,
        req.headers.cookie,
        "GET"
      ),
    ];

    Promise.all(requestData)
      .then((data) => {
        res.render("cms/sidenav-edit.ejs", {
          // _csrf: req.csrfToken(),
          sidenav: data[0],
          response: "",
        });
      })
      .catch((err) => {
        res.render("cms/sidenav-edit.ejs", {
          response: "error",
          msg: err,
        });
      });
  },

  editPost: function (req, res, next) {
    var requestData = [
      common.apiRequest(
        req.protocol + "://" + req.get("host") + "/api/sidenav/update",
        req.headers.cookie,
        "POST",
        req.body,
        req.files
      ),
    ];
    Promise.all(requestData)
      .then((data) => {
        res.render("cms/sidenav-edit.ejs", {
          sidenav: data[0],
          response: "success",
          msg: "Updated successfully.",
        });
      })
      .catch((err) => {
        // console.log(err);
        res.render("cms/sidenav-edit.ejs", {
          response: "error",
          msg: err,
        });
      });
  },

  deletePost: function (req, res, next) {
    if (!req.body || !req.body.id) {
      return next(
        ec.appError({
          status: ec.INVALID_ID,
          message: "invalid id provided.",
        })
      );
    }

    var requestData = [
      common.apiRequest(
        req.protocol + "://" + req.get("host") + "/api/sidenav/delete",
        req.headers.cookie,
        "POST",
        req.body
      ),
    ];

    let result = { success: false };

    Promise.all(requestData)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.log("e:", err);
      });

    res.json({ success: true });
  },
};
module.exports = sidenav;
