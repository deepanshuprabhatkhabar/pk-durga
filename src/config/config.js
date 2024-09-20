"use strict";

module.exports = {
    session_redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || '',
        db: process.env.REDIS_DB || 1
    },
    session: {
        key: process.env.SESSION_ID || 'pkdurga.sid',
        secret: process.env.SESSION_SECRET || '11aa22bb33cc44ddeeff1123'
    },
    jwt: {
        secret: process.env.JWT_SECRET || "1a1a2b2b3c3c4d4d5e5e6f6fafdfdfdadad"
    },
    mongodb: {
        host: process.env.MONGODB_HOST || '127.0.0.1',
        port: process.env.MONGODB_PORT || '27017',
        username: process.env.MONGODB_USERNAME || 'root',
        password: process.env.MONGODB_PASSWORD || '',
        auth_db: process.env.MONGODB_AUTH_DB || 'admin',
        app_db: process.env.MONGODB_APP_DB || 'pkdurga'
    },
    cookie: {
        domain: process.env.COOKIE_DOMAIN || undefined,
        httpOnly: true,
        maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 2 * 24 * 60 * 60 * 1000 // in ms
    }
};