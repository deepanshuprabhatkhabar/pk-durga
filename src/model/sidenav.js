"use strict";

var mongoose = require("mongoose");
var ec = require("../lib/error_consts");

var sidenavSchema = new mongoose.Schema({
  title: { type: String },
  nav: { type: String },
});
var sidenavModel = mongoose.model("sidenav", sidenavSchema);

var sidenav = {
  create: function (params, cb) {
    if (!params) {
      return cb(
        ec.appError({
          status: ec.INVALID_PARAM,
          message: "No data provided",
        })
      );
    }

    sidenavModel.create(params, function (err, result) {
      if (err) {
        console.log(err);
        return cb(
          ec.appError({
            status: ec.DB_ERROR,
            message: "DB Fetch Error",
          })
        );
      }

      return cb(err, result);
    });
  },

  fetchAll: function (cb) {
    sidenavModel.find(function (err, result) {
      if (err) {
        console.log(err);
        return cb(
          ec.appError({
            status: ec.DB_ERROR,
            message: "DB Fetch Error",
          })
        );
      }
      return cb(err, result);
    });
  },

  fetchById: function (id, cb) {
    sidenavModel.find({ _id: id }, function (err, result) {
      if (err) {
        console.log(err);
        return cb(
          ec.appError({
            status: ec.DB_ERROR,
            message: "DB Fetch Error",
          })
        );
      }
      return cb(err, result[0]);
    });
  },

  update: function (id, updateData, cb) {
    if (!updateData || !id) {
      return cb(
        ec.appError({
          status: ec.INVALID_PARAM,
          message: "No data provided",
        })
      );
    }

    sidenavModel.updateOne(
      { _id: id },
      { $set: updateData },
      function (err, result) {
        if (err) {
          console.log(err);
          return cb(
            ec.appError({
              status: ec.DB_ERROR,
              message: "DB update Error",
            })
          );
        }

        return cb(err, result);
      }
    );
  },

  deleteId: function (params, cb) {
    sidenavModel.deleteOne({ _id: params.id }, function (err, result) {
      if (err) {
        return cb(
          ec.appError({
            status: ec.DB_ERROR,
            message: "DB Fetch Error",
          })
        );
      }
      //console.log(result);
      return cb(err, result);
    });
  },
};
module.exports = sidenav;
