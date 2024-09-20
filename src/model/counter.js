'use strict';

const ec = require('../lib/error-consts');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    counter_name: String,
    counter: Number
});

module.exports = mongoose.model("counter", counterSchema);