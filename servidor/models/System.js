const mongoose = require('mongoose');

const SystemSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    estado:{
        type:Boolean,
        default:false
    },
    asset:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    }
})

module.exports = mongoose.model('System', SystemSchema);