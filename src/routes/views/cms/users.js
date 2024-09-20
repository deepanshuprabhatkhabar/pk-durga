'use strict';
var request = require('request');
var common = require('./common');
var moment = require('moment');

var passport = require('passport');

var users = {

    login: function(req, res, next) {

        if (req.user) {

            if (req.user.role === 'ADMINISTRATOR') {
                res.redirect('/cms/dashboard');
                return;
            } else {
                res.redirect('/cms/logout');
            }
        }
        res.render('cms/login.ejs', { 
            _csrf: req.csrfToken(),
            post: false
        });
    },

    loginPost: function(req, res, next) {

        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            
            if (!user) {
                return res.render('cms/login.ejs', { 
                    _csrf: req.csrfToken(),
                    post: true,
                    error: 'Invalid email or password.'
                });
            }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/cms/dashboard');
            });
        })(req, res, next);
    },

    logout: function(req, res, next) {
        if (req.user) {
            req.logout();
            req.session.destroy(function(err) {
                if (err) console.log(err);
                res.redirect('/cms/login');
            });
        } else {
            res.redirect('/');
        }
    },

    dashboard: function(req, res, next) {
        res.render('cms/dashboard.ejs');
    },

    page403: function(req, res, next) {

        var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
        console.log('403 request. ' + req.method + ' ' + ip + ' ' + req.url + ' ' + req.user.email + ' ' + req.id);
        res.status(403);
        res.render('cms/403.ejs');
    },

    page404: function(req, res, next) {

        var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
        console.log('404 request. ' + req.method + ' ' + ip + ' ' + req.url + ' ' + req.user.email + ' ' + req.id);
        res.status(404);
        res.render('cms/404.ejs');
    }
}

module.exports = users;