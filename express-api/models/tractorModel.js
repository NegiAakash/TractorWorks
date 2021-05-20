const mongoose = require('mongoose');

const tractorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'TRACTOR_NAME_REQUIRED'],
        unique: true
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand'
    },
    availability: {
        type: Boolean
    }
})

module.exports = mongoose.model('tractor', tractorSchema);