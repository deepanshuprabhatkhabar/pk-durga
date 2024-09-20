'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet')
const path = require('path');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const sessionMiddleware = require("./src/config/session-middleware.js");


const config = require('./src/config/config');

var app = express();

app.use(cors())

app.use(helmet());
app.set('trust proxy', 1);
app.set('port', config.port);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(fileUpload({
    parseNested: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(sessionMiddleware);

var env = process.env.NODE_ENV;

morgan.token('id', function getId(req) {
    return req.id;
});

app.use(assignId);
app.use(morgan("[:date[iso] #:id] \x1b[36mStarted\x1b[0m     :method  :remote-addr  :url", {immediate: true}));
app.use(morgan("[:date[iso] #:id] \x1b[33mCompleted\x1b[0m   :status  :remote-addr  :url  :res[content-length] in :response-time ms"));

if (env === 'development') {
    app.use(errorhandler());
}

app.use(function(req, res, next) {
    res.locals.passport = req.session.passport;
    next();
});

require('./src/config/passport')(app);
require('./src/routes')(app);

//socket.io


function assignId (req, res, next) {
    req.id = uuidv4();
    next()
}

module.exports = app;
