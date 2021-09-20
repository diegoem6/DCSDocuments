const mongoose = require('mongoose');

const DeviceTypeSchema = mongoose.Schema({
    Model:{
        type:String,
        require:true
    },
    URL:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model('DeviceType', DeviceTypeSchema);