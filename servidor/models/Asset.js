const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    createddate:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Asset', AssetSchema);