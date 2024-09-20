'use strict';
var csrf = require('csurf');
var csrfProtection = csrf();
var error = require('../../error');
var auth = require('../../auth/authenticate');
var users = require('./users.js');
var form = require('./form')



module.exports = function(app) {

      //enquiry
  app.get("/cms/forms/manage",auth.checkSessionUser,auth.checkAccessControl,form.manage,error);
  app.get("/cms/spet-talk/manage",auth.checkSessionUser,auth.checkAccessControl,form.manage,error);
  

    //Login routes
    app.get('/cms/login', csrfProtection, users.login, error);
    app.get('/cms/logout', users.logout, error);
    app.get('/cms/dashboard', auth.checkSessionUser, users.dashboard, error);

    app.post('/cms/login', csrfProtection, users.loginPost, error);

    


};
