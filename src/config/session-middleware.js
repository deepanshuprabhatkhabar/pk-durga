const config = require("../config/config");
const session = require('express-session');
const redis = require('redis');
var RedisStore = require('connect-redis')(session);

var client = redis.createClient({
    host: config.session_redis.host,
    port: config.session_redis.port,
    // password: config.session_redis.password,
    db: config.session_redis.db
});
client.on('error', (err) => {
    console.log('redis connection error', err);
    process.exit(1);
});

client.on('ready', () => {
    console.log('redis connected');
});

let sessionMiddleware;

sessionMiddleware = session({
    key: config.session.key,
    store: new RedisStore({ client }),
    secret: config.session.secret,
    saveUninitialized: false,
    resave: false,
    cookie: config.cookie
});    


module.exports = sessionMiddleware;