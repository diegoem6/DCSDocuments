const mongoose = require('mongoose');

const NetworkNodeSchema = mongoose.Schema({
    nodeName:{
        type:String,
        require:true,
        trim:true
    },
    nodeDescription:{
        type:String,
        require:true,
        trim:true
    },
    nodeModel:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'NetworkNodeModel'
    },
    area:{
        type:Number
    },
    nodeIP:{
        type:String,
        require:true,
        trim:true
    },
    createddate:{
        type:Date,
        default:Date.now()
    },
    asset:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    },
    deviceType:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType'
    }
})

module.exports = mongoose.model('NetworkNode', NetworkNodeSchema);