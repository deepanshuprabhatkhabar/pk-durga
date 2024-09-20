"use strict";

var mongoose = require("mongoose");
var ec = require("../lib/error_consts");
//console.log(cons.year);
var Schema = mongoose.Schema;

var accessSchema = new mongoose.Schema({
          access_id:{ type: Number },
          access_rights: {},

});
var acessModel = mongoose.model("access-control", accessSchema);

var access = {
    fetchAC: function(cb) {
        acessModel.findOne({access_id: 1}, function(err, result) {
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
};
module.exports = access;