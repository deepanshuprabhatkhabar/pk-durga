'use strict';

var error = require('../error');
var auth = require('../auth/authenticate')
var users = require('./users.js');

module.exports = function(app) {

	//get routes
    app.get('/api/user/logout', users.logout, error);
	app.get('/api/user/:id', users.fetchById, error);

	// post routes
	app.post('/api/user/register', users.register, error);
	app.post('/api/user/password/forgot', users.forgotPassword, error);
	app.post('/api/otp/verify', users.verifyOtp, error);
	app.post('/api/user/:id/otp', users.verifyOtp, error);
}