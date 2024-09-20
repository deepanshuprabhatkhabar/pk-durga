"use strict";
// const request = require("request");

const needle = require("needle");
const ec = require('../../lib/error-consts');
const path = require('path');
const { customAlphabet } = require('nanoid');
const axios = require('axios')
const fs = require('fs');
const utils = require('util');

var views = {

    indexNew: async function (req, res, next) {

        try {

            res.render('index-new.ejs', {
                _csrf: req.csrfToken(),
                utm_sourcekey : req.query.utm_source,
                utm_mediumkey:req.query.utm_medium,
                utm_campaignkey:req.query.utm_campaign
            });

        } catch (err) {
            console.log("error",err.message);
        }

        
    },
};


module.exports = views;