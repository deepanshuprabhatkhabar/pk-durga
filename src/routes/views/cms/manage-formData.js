'use strict';
var request = require('request');
var common = require('./common');
var moment = require('moment');


var FormData = {
manage: function(req, res, next) {

    common.apiRequest(req.protocol + '://'  + req.get('host') + '/api/pkmaster', 'GET')
        .then((result) => {
            res.render('/cms/manage-formData.ejs', { about: result,moment: moment });
        }).catch(err => {
            console.log(err);
            res.render('/cms/manage-formData.ejs');
        });
},  

}

module.exports=FormData