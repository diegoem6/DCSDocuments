const mongoose = require('mongoose');

const CabinetSchema = mongoose.Schema({
    cabinetName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    cabinetDescription: {
        type: String,
        required: true,
        trim: true
    },
    cabinetLatitude: {
        type: String,
        require: true
    },
    cabinetLongitude: {
        type: String,
        require: true
    },
    cabinetSize: {
        type: Number,
        require: true
    },
    area: {
        type: Number,
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    },
    files: {
        type: [String]
    },
    createddate: {
        type: Date,
        default: Date.now()
    },
})


module.exports = mongoose.model('Cabinet', CabinetSchema);
