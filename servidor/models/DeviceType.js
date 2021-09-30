const mongoose = require('mongoose');

const DeviceTypeSchema = mongoose.Schema({
    type:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model('DeviceType', DeviceTypeSchema);