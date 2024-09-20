'use strict';

var ec = require('../../lib/error_consts');
const access_model = require("../../model/access-control");

var authenticate = {

    checkSessionUser: function(req, res, next) {
        if (!req.user) {
            var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
            console.log('Unauthorised request. ' + req.method + ' ' + ip + ' ' + req.url);
            res.redirect('/');
        } else {
            return next();
        }
    },

    checkAdmin: function(req, res, next) {
        if (!req.user) {
            var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
            console.log('Unauthorised request. ' + req.method + ' ' + ip + ' ' + req.url);
            res.redirect('/');
        } else if(req.user.role !== 'ADMINISTRATOR'){
        	res.redirect('/cms/logout');
        } else {
            return next();
        }
    },

    checkAccessControl: function(req, res, next){

        if (!req.user) {
            var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
            console.log('Unauthorised request. ' + req.method + ' ' + ip + ' ' + req.url);
            res.redirect('/');
        } 
        
        if(req.user.role === 'ADMINISTRATOR'){
        	return next();
        }


        const url = req.originalUrl;
       let split_using = 'api/';
        if (url.includes('cms/')) {
            split_using = 'cms/';
        }

        const xt = url.split(split_using)[1].split("/")[0];

        const related_func = {
            "blog": "blogFunctionality"
        };

        access_model.fetchAC(function(err, result){
            if(err){
                res.redirect("/");
            } else {
               
                let access_c = result.access_rights[related_func[xt]];

                if (access_c && access_c.includes(req.user.role)) {
                    return next();
                } else {
                    res.redirect('/cms/logout');
                }
            }
            
        });


    }
}

module.exports = authenticate;
