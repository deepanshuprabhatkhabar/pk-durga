'use strict';

var mongoose = require('mongoose');
var ec = require('../lib/error_consts');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    dob: { type: Date },
    gender: { type: String },
    phone: { type: String },
    password: { type: String },
    otp_secret: { type: String, default: null },
    role: { type: String, enum: ['ADMINISTRATOR', 'USER', "BLOG_USER" ], default: 'USER' },
    status: { type: String, enum: ['ACTIVE', 'DISABLED', 'BLOCKED'], default: 'ACTIVE' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


var userModel = mongoose.model('user', userSchema);


var user = {

    findByEmail: function(email, cb) {

        if (!email) {
            return cb(ec.appError({
                status: ec.INVALID_PARAM,
                message: "No email provided"
            }));
        }

        userModel.find({ email: email }, function(err, result) {

            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }

            // console.log(result);
            return cb(err, result);

        });
    },

    findByPhone: function(phone, cb) {

        if (!phone) {
            return cb(ec.appError({
                status: ec.INVALID_PARAM,
                message: "No phone provided"
            }));
        }

        userModel.find({ phone: phone }, function(err, result) {

            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }

            // console.log(result);
            return cb(err, result);

        });
    },

    fetchById: function(id, cb) {

        userModel.find({ _id: id }, { password: 0, updated_at: 0, __v: 0 }, function(err, result) {

            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }

            // console.log(result);
            return cb(err, result[0]);

        });
    },

    changePassword: function(passwordData, cb) {

        if (!passwordData) {
            return cb(ec.appError({
                status: ec.INVALID_PARAM,
                message: "no password data"
            }));
        }

        if (!passwordData.email || !passwordData.password) {
            return cb(ec.appError({
                status: ec.INVALID_PARAM,
                message: "no password provided"
            }));
        }

        userModel.updateOne({ email: passwordData.email }, { password: passwordData.password }, { runValidators: true }, function(err, result) {

            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Password Update Error"
                }));
            }

            console.log(result);
            return cb(err, result);

        });
    },

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

    update: function(id, updateData, cb) {

        if (!updateData || !id) {
            return cb(ec.appError({
                status: ec.INVALID_PARAM,
                message: "No data provided"
            }));
        }

        userModel.updateOne({ _id: id }, { $set: updateData }, function(err, result) {

            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB update Error"
                }));
            }

            return cb(err, result);
        });
    }
}


module.exports = user;

(function() {
    if (require.main == module) {

        require('./db.js');
        user.findByEmail('nitish@weaddo.com', console.log);
    }
}());