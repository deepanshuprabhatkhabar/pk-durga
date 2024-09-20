'use strict';

const { Validator } = require('node-input-validator');
var bcrypt = require('bcrypt');

var usersApi = require('../../api/users');
var ec = require('../../lib/error_consts');
//var validatorRules = require('../../lib/validator_rules');


var users = {

    register: async function(req, res, next) {

        if (!req.body) {
            return next(ec.appError({
                status: ec.INVALID_PARAM,
                message: "No data provided."
            }));
        }

        // const v = new Validator(req.body, validatorRules.users);
        // const matched = await v.check();
        // if(!matched){            
        //     // console.log(v.errors);
        //     var errMsg = '';
        //     for (var key in v.errors){
        //         errMsg += v.errors[key].message + ' ';
        //     }
        //     return next(ec.appError({
        //         status: ec.INVALID_DATA,
        //         message: errMsg
        //     }));
        // }        

        bcrypt.hash(req.body.password, 10, function(err, passHash) {

            var params = {
                email: req.body.email,
                password: passHash,
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                phone: req.body.phone
            };

            usersApi.register(params, function(err, data) {

                if (err) {
                    return next(err);
                }
                res.json("Registration successful.");
            });
            
        });
    },

    fetchById: function(req, res, next) {

        if (!req.user) {
            return next(ec.appError({
                status: ec.UNAUTHORIZED_ACCESS,
                message: "user not logged in."
            }));
        }

        if (!req.params || !req.params.id) {
            return next(ec.appError({
                status: ec.INVALID_ID,
                message: "invalid user id provided."
            }));
        }

        usersApi.fetchById(req.params.id, function(err, data) {

            if (err) {
                return next(err);
            }
            res.json(data);
        });
    },

    forgotPassword: function(req, res, next) {

        if (!req.body || !req.body.email) {
            return next(ec.appError({
                status: ec.INVALID_ID,
                message: "invalid email id provided."
            }));
        }

        usersApi.forgotPassword(req.body.email, function(err, data) {

            if (err) {
                return next(err);
            }
            res.json(data);
        });
    },

    verifyOtp: function(req, res, next) {

        if (!req.body || !req.body.id || !req.body.otp) {
            return next(ec.appError({
                status: ec.INVALID_ID,
                message: "invalid data provided."
            }));
        }

        if (!req.body.password || !req.body.confirmPassword) {
            return next(ec.appError({
                status: ec.UNDEFINED_DATA,
                message: "invalid data provided."
            }));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(ec.appError({
                status: ec.INVALID_DATA,
                message: "Passwords do not match."
            }));
        }

        bcrypt.hash(req.body.password, 10, function(err, passHash) {

            req.body.passHash = passHash;

            usersApi.verifyOtp(req.body, function(err, data) {

                if (err) {
                    return next(err);
                }
                res.json(data);
            });
            
        });
    },

    changePassword: function(req, res, next) {

        if (!req.session.passport) {
            return next(ec.appError({
                status: ec.UNAUTHORIZED_ACCESS,
                message: "user not logged in."
            }));
        }

        if (!req.body) {
            return next(ec.appError({
                status: ec.INVALID_PARAM,
                message: "No data provided."
            }));
        }

        if (!req.body.passwd || !req.body.rePasswd) {
            return next(ec.appError({
                status: ec.UNDEFINED_DATA,
                message: "No data provided."
            }));
        }

        if (req.body.passwd !== req.body.rePasswd) {
            return next(ec.appError({
                status: ec.INVALID_DATA,
                message: "Passwords do not match."
            }));
        }

        bcrypt.hash(req.body.passwd, 10, function(err, passHash) {

            var passwordData = {
                password: passHash,
                email: req.session.passport.user.email
            };

            usersApi.changePassword(passwordData, function(err, data) {

                if (err) {
                    return next(err);
                }
                console.log('Password Updated Successfully For :: ' + passwordData.email);
                res.json(data);
            });
            
        });
    },

    logout: function(req, res, next) {
        if (req.user) {
            req.logout();
            req.session.destroy(function(err) {
                if (err) console.log(err);
                res.json('success');
            });
        } else {
            res.redirect('success');
        }
    },
}

module.exports = users;
