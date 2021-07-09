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
    }
})

module.exports = mongoose.model('NetworkNodeModel', NetworkNodeModelSchema);