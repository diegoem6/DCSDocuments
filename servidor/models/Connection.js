const mongoose = require('mongoose');

const ConnectionSchema = mongoose.Schema({
    source:{
        type:String,
        require:true,
        trim:true
    },
    target:{
        type:String,
        require:true,
        trim:true
    },
    source_port:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        trim:true
    },
    type:{
        type:String,
        require:true,
        trim:true
    },
    createddate:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Connection', ConnectionSchema);