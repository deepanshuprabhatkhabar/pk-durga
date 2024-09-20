'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const loginModel = require('../../model/login.js');
const moment = require('moment');

module.exports = function (app) {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        async function (req, email, password, done) {

            let userInfoFromMail = {};
            let message;
            let error = false;

            // let role = req.body.role || 'PATIENT';

            await loginModel.findByEmail(email)
                .then((res) => {
                    if (res.data) {
                        userInfoFromMail = res.data;
                    } else {
                        error = true;
                        message = 'DB Error';
                    }
                })
                .catch((err) => {
                    error = true;
                    message = 'DB Error';
                });

            if (error) {
                return done(null, false, {
                    message: message
                });
            } else if (!userInfoFromMail || !userInfoFromMail.length) {
                return done(null, false, {
                    message: 'Invalid Email'
                });
            } else {

                let result = userInfoFromMail[0];

                let password_matched = await bcrypt.compare(password, result.password)

                if (password_matched) {
                    var user = {
                        id: result._id,
                        email: result.email,
                        role: result.role,
                        name: result.name
                    }

                    return done(null, user);

                } else {
                    return done(null, false, {
                        message: 'Invalid Password'
                    });
                }
            }
        }));
};