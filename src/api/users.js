'use strict';
var async = require('async');
var nodemailer = require('nodemailer');
const { totp, authenticator } = require('otplib');
totp.options = { window: 2 };

var usersModel = require('../model/users');
var ec = require('../lib/error_consts');
var mailFormats = require('../lib/mail_formats');


var users = {

    register: function(params, cb) {

        if (!params) {
            return cb(ec.appError({
                status: ec.INVALID_PARAM,
                message: "no password data"
            }));
        }

        async.parallel([

                function(innerCb) {

                    usersModel.findByEmail(params.email, function(err, result) {

                        if (err) {
                            return innerCb(err);
                        }

                        if(result.length){
                            return innerCb(ec.appError({
                                status: ec.USER_EXISTS,
                                message: "Email already exists"
                            }));
                        }

                        return innerCb();
                    });
                },

                function(innerCb) {

                    usersModel.findByPhone(params.phone, function(err, result) {

                        if (err) {
                            return innerCb(err);
                        }

                        if(result.length){
                            return innerCb(ec.appError({
                                status: ec.USER_EXISTS,
                                message: "Pnone number already exists"
                            }));
                        }

                        return innerCb();
                    });
                }
            ],
            function(err, results) {

                if (err) {
                    return cb(err);
                }

                usersModel.create(params, function(err, result) {

                    if (err) {
                        return cb(err);
                    }

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'daljeet.develop@gmail.com',
                            pass: 'xbxhbtvgmekknfwo'
                        }
                    });

                    var mailOptions = {
                        from: 'Motherhood India <daljeet.develop@gmail.com>',
                        to: params.email,
                        subject: 'Welcome to Motherhood India',
                        html: mailFormats.welcome(params),
                        attachments: [{
                            filename: 'mail-banner.jpg',
                            path: 'public/img/mail-banner.jpg',
                            cid: 'banner'
                        }, {
                            filename: 'mail-sp.jpg',
                            path: 'public/img/mail-sp.jpg',
                            cid: 'sp'
                        }]
                    };

                    transporter.sendMail(mailOptions, function(error, info) {

                        if (error) {
                            console.log('error in sending welcome mail');
                            console.log(error);
                        } else {
                            console.log('Welcome email sent: ' + info.response);
                        }

                        return cb(err, result);
                    });
                });
            });                
    },

    fetchById: function(id, cb) {

        usersModel.fetchById(id, function(err, result) {

            if (err) {
                return cb(err);
            }

            return cb(err, result);
        });
    },

    forgotPassword: function(email, cb) {

        async.waterfall([checkUser, generateOtp, sendMail], function (err, userData) {

            if (err) {
                return cb(err);
            }

            var resData = {
                msg: 'Otp successfully sent on mail',
                user_id: userData._id
            }
            return cb(err, resData);
        });

        function checkUser(innerCb){

            usersModel.findByEmail(email, function(err, result) {

                if (err) {
                    return innerCb(err);
                }

                if(!result.length){
                    return innerCb(ec.appError({
                        status: ec.NOT_FOUND,
                        message: "Email does not exists"
                    }));
                }

                if(result.length > 1){
                    return innerCb(ec.appError({
                        status: ec.NOT_FOUND,
                        message: "More than 1 account with this email exists"
                    }));
                }

                return innerCb(err, result[0]);
            });
        }

        function generateOtp(userData, innerCb){

            var secret = authenticator.generateSecret();
            var token = totp.generate(secret);

            usersModel.update(userData._id, {otp_secret: secret}, function(err, result) {

                if (err) {
                    return innerCb(err);
                }

                userData['otp'] = token;

                return innerCb(err, userData);
            });
        }

        function sendMail(userData, innerCb){

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'daljeet.develop@gmail.com',
                    pass: 'xbxhbtvgmekknfwo'
                }
            });

            var mailOptions = {
                from: 'Motherhood India <daljeet.develop@gmail.com>',
                to: userData.email,
                subject: 'Motherhood India, OTP to reset password',
                html: mailFormats.resetPassword(userData),
                attachments: [{
                    filename: 'mail-logo.png',
                    path: 'public/img/mail-logo.png',
                    cid: 'logo'
                }]
            };

            transporter.sendMail(mailOptions, function(error, info) {

                if (error) {
                    console.log('error in sending otp mail');
                    console.log(error);
                } else {
                    console.log('Otp email sent: ' + info.response);
                }

                return innerCb(error, userData);
            });
        }
    },

    verifyOtp: function(params, cb) {

        async.waterfall([getSecret, validateOtp, sendMail], function (err, userData) {

            if (err) {
                return cb(err);
            }

            var resData = {
                msg: 'success',
                user_id: userData._id,
                email: userData.email
            }
            return cb(err, resData);
        });

        function getSecret(innerCb){

            usersModel.fetchById(params.id, function(err, result) {

                if (err) {
                    return innerCb(err);
                }

                if(!result || !result._id){
                    return innerCb(ec.appError({
                        status: ec.NOT_FOUND,
                        message: "user does not exists"
                    }));
                }

                return innerCb(err, result);
            });
        }

        function validateOtp(userData, innerCb){

            var isValid = totp.check(params.otp, userData.otp_secret);

            if(!isValid){
                return innerCb(ec.appError({
                    status: ec.WRONG_OTP,
                    message: "invalid otp"
                }));
            }

            var secret = authenticator.generateSecret();

            usersModel.update(userData._id, {otp_secret: secret, password: params.passHash}, function(err, result) {

                if (err) {
                    return innerCb(err);
                }
                return innerCb(err, userData);
            });
        }

        function sendMail(userData, innerCb){

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'daljeet.develop@gmail.com',
                    pass: 'xbxhbtvgmekknfwo'
                }
            });

            var mailOptions = {
                from: 'Motherhood India <daljeet.develop@gmail.com>',
                to: userData.email,
                subject: 'Motherhood India, Password reset successfully.',
                html: mailFormats.resetPasswordSuccess(userData),
                attachments: [{
                    filename: 'mail-logo.png',
                    path: 'public/img/mail-logo.png',
                    cid: 'logo'
                }]
            };

            transporter.sendMail(mailOptions, function(error, info) {

                if (error) {
                    console.log('error in sending otp mail');
                    console.log(error);
                } else {
                    console.log('Reset password success email sent: ' + info.response);
                }

                return innerCb(error, userData);
            });
        }
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

        usersModel.changePassword(passwordData, function(err, result) {

            if (err) {
                return cb(err);
            }

            return cb(err, result);
        });
    }
}


module.exports = users;
