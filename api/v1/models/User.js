const mongoose = require('mongoose');

const BaseModel = require('./BaseModel');

const config = require('config');
const configFromEnv = require('../../../config/configFromEnv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = BaseModel({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: config.get('userStatuses.active')
    },
    password: {
        type: String,
        required: true
    }
});

User.methods.generateJwt = function () {

    const payload = {
        _id: this._id,
        email: this.email,
        role: config.get('roles.admin')
    };

    const token = jwt.sign(payload, configFromEnv.secret, {
        expiresIn: configFromEnv.tokenExpiresIn
    });

    return token;
};

User.methods.comparePassword = async function (password) {
    let compareResult = await bcrypt.compareSync(password, this.password);
    return compareResult;
};

User.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this._doc.password, salt);
    next();
});

module.exports = mongoose.model('User', User);