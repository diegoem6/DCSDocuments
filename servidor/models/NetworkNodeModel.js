const mongoose = require('mongoose');

const NetworkNodeModelSchema = mongoose.Schema({
    Model:{
        type:String,
        require:true
    },
    URL:{
        type:String,
        require:true,
        trim:true
    },
    port_fast:{
        type: Number,
        require:true
    },
    port_giga:{
        type: Number,
        require:true
    }
})

module.exports = mongoose.model('NetworkNodeModel', NetworkNodeModelSchema);