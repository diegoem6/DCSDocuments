const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    deviceName:{
        type:String,
        require:true,
        trim:true
    },
    deviceDescription:{
        type:String,
        require:true,
        trim:true
    },
    deviceType:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType'
    },
    deviceIP:{
        type:String,
        require:true,
        trim:true
    },
    deviceURLOPC:{
        type: String
    },
    createddate:{
        type:Date,
        default:Date.now()
    },
    asset:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    }
})

module.exports = mongoose.model('Device', DeviceSchema);