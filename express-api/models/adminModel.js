const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        required: [true, 'EMAIL_REQUIRED'],
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'INVALID_EMAIL'],
        unique: true,
        trim: true,
        lowercase: true
    },
    fname: {
        required: [true, 'FIRST_NAME_REQUIRED'],
        type: String,
        trim: true,
        match: [/^[a-zA-Z]*$/, 'INVALID_FIRST_NAME']
    },
    lname: {
        required: false,
        type: String,
        trim: true,
        match: [/^[a-zA-Z]*$/, 'INVALID_LAST_NAME']
    },
    pwd: {
        required: [true, 'PASSWORD_REQUIRED'],
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Admin', adminSchema);