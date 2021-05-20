const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'BRAND_NAME_REQUIRED'],
        trim: true
    },
    contacts: [{
        type: String,
        unique: false,
        trim: true,
        match: [/^[0-9]{10}$/, 'INCORRECT_CONTACT_FORMAT']
    }]
})

module.exports = mongoose.model('brand', brandSchema)