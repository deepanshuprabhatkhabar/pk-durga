'use strict';

var mongoose = require('mongoose');
var ec = require('../lib/error_consts');

var Schema = mongoose.Schema;

var thankyouSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    timeslot: { type: String },
    uploadref: { type: String, default:Date.now},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


var thankyouModel = mongoose.model('thankyou', thankyouSchema);


var thankyou = {
create: function(params, cb) {

    if (!params) {
        return cb(ec.appError({
            status: ec.INVALID_PARAM,
            message: "No data provided"
        }));
    }

    userModel.create(params, function(err, result) {

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

}


module.exports = user;

(function() {
    if (require.main == module) {

        require('./db.js');
        user.findByEmail('nitish@weaddo.com', console.log);
    }
}());