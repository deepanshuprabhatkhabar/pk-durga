"use strict";

const { Validator } = require("node-input-validator");
var _ = require("underscore");

var sidenavApi = require("../../api/sidenav");
var ec = require("../../lib/error_consts");
var sidenav = {
  add: async function (req, res, next) {
    if (!req.body) {
      return next(
        ec.appError({
          status: ec.UNDEFINED_DATA,
          message: "no data provided.",
        })
      );
    }
    var params = req.body;

    params["user"] = req.user.id;

    sidenavApi.add(req.body, function (err, data) {
      if (err) {
        return next(err);
      }
      res.json(data);
    });
  },

  fetchAll: function (req, res, next) {
    sidenavApi.fetchAll(function (err, data) {
      if (err) {
        return next(err);
      }

      res.json(data);
    });
  },

  fetchById: function (req, res, next) {
    if (!req.params || !req.params.id) {
      return next(
        ec.appError({
          status: ec.INVALID_ID,
          message: "invalid id provided.",
        })
      );
    }

    sidenavApi.fetchById(req.params.id, function (err, data) {
      if (err) {
        return next(err);
      }
      res.json(data);
    });
  },

  update: async function (req, res, next) {
    if (!req.user) {
      return next(
        ec.appError({
          status: ec.UNAUTHORIZED_ACCESS,
          message: "user not logged in.",
        })
      );
    }

    if (!req.user.role === "ADMINISTRATOR") {
      return next(
        ec.appError({
          status: ec.UNAUTHORIZED_ACCESS,
          message: "user is not admin.",
        })
      );
    }

    if (!req.body) {
      return next(
        ec.appError({
          status: ec.UNDEFINED_DATA,
          message: "no data provided.",
        })
      );
    }

    var params = req.body;
    params["user"] = req.user.id;

    sidenavApi.update(params, function (err, data) {
      if (err) {
        return next(err);
      }
      res.json(data);
    });
  },

  delete: function (req, res, next) {
    if (!req.body || !req.body.id) {
      return next(
        ec.appError({
          status: ec.INVALID_ID,
          message: "invalid id provided.",
        })
      );
    }
    sidenavApi.deleteId({ id: req.body.id }, function (err, data) {
      if (err) {
        return next(err);
      }
      res.json(data);
    });
  },
};
module.exports = sidenav;
