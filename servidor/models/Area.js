const mongoose = require('mongoose');

const AreaSchema = mongoose.Schema({
    area:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model('Area', AreaSchema);