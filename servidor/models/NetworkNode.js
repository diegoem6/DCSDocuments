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
    }
})

module.exports = mongoose.model('NetworkNode', NetworkNodeSchema);