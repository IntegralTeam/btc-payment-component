const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./BaseModel');

const Model = BaseModel({
    address: {
        type: String,
        required: true
    },
    externalId: {
        type: String,
        required: true
    },
    expectedAmount: {
        type: Number,
        required: true
    },
    fullfilled: {
        type: Boolean,
        default: false
    },
    hoursToCheck: {
        type: Date,
        default: Date.now
    },
    callbackName: {
        type: String
    },
    callbackArgs: {
        type: Object
    },
    createdBy: Schema.Types.ObjectId
});

module.exports = mongoose.model('Wallet', Model);