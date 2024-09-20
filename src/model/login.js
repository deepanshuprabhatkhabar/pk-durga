'use strict';

const ec = require('../lib/error-consts');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
    _id: {
        type: String
    },
    email: {
        type: String,
        index: {
            unique: true
        }
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['ADMIN'],
        default: 'ADMIN'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const loginModel = mongoose.model("users", loginSchema);

const login = {

    findByEmail: async function (email) {

        let result = {};

        if (!email) {
            result["error"] = ec.appError({
                status: ec.INVALID_PARAM,
                message: "No data provided"
            })
            return result;
        }


        await loginModel.find({
                email: email
            })
            .then((res) => {
                if (res) {
                    result["data"] = res;
                }
            })
            .catch((err) => {
                result["error"] = ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                })
            })

        return result;
    }

}

module.exports = login;