"use strict";
let csrf = require('csurf');
let csrfProtection = csrf();
const error = require("../error");
const views = require("./views");
const auth = require("../../auth/authentication.js")
module.exports = function (app) {

    app.get('/', csrfProtection, views.indexNew, error);

    require('./cms')(app);

};
