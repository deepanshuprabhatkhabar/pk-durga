'use strict';

const jwt = require('jsonwebtoken');
const ec = require("../lib/error-consts.js");
const JWT_SECRET = process.env.JWT_SECRET;
const moment = require("moment");

const auth = {

    generateToken: function (tokenData) {

        let token = jwt.sign(tokenData, JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    },

    validateToken: async function (req, res, next) {

        let token = req.headers['x-access-token'];

        if (!token) {
            return next(ec.appError({
                status: ec.UNAUTHORIZED_ACCESS,
                message: "invalid token"
            }));
        }

        jwt.verify(token, JWT_SECRET, function (err, decoded) {

            if (!decoded) {
                return next(ec.appError({
                    status: ec.UNAUTHORIZED_ACCESS,
                    message: "Failed to authenticate token."
                }));
            }

            req.user = {
                id: decoded.id,
                role: decoded.role
            }

            return next();
        });

    },

    checkSessionUser: function (req, res, next) {
        console.log(req.user);
        if (!req.user) {
            var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
            console.log('Unauthorised request. ' + req.method + ' ' + ip + ' ' + req.url);
            res.redirect('/login');
        } else {
            return next();
        }
    },

    checkAdmin: function (req, res, next) {

        if (req.user.role !== 'ADMIN') {
            res.redirect('/logout');
        } else {
            return next();
        }
    },

    checkDataEntryUser: function (req, res, next) {
        
        const DATA_ENTRY_ACCESS = ["ADMIN", "DATA_ENTRY"];

        if (DATA_ENTRY_ACCESS.includes(req.user.role)) {
            return next();
        } else {
            res.redirect('/logout');
        }
    },

};

module.exports = auth;