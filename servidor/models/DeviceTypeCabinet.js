const mongoose = require('mongoose');

const DeviceTypeCabinetSchema = mongoose.Schema({
    type:{
        type:String,
        require:true,
        trim:true
    },
    size:{
        type:Number,
        require:true
    }
})

module.exports = mongoose.model('DeviceTypeCabinet', DeviceTypeCabinetSchema);