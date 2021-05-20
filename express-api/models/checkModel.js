const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    value: String
})

module.exports = mongoose.model('Check', checkSchema)