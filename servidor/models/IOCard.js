const mongoose = require('mongoose');
const DeviceTypeCabinet = require ('../models/DeviceTypeCabinet');

const IOCardSchema = mongoose.Schema({
    tagname:{
        type:String,
        require:true,
        trim:true
    },
    type:{
        //type:Number, //1=AI, 2=AO, 3=DI, 4=DO
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    /*controller:{
        type:String,
        require:true,
        trim:true
    },*/
    iolink:{
        type:Number, //iolink 1 o 2
        require:true
    },
    deviceIndex:{
        type:Number,
        require:true
    },
    /*redundant:{
        type:Boolean,
        default:false
    },*/
    cabinet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cabinet' //hace referencia al id del modelo cabinet
    },
    location:{
        type:String,
        require:true,
        trim:true
    },
    sideLocation:{
        type:String,
        require:true,
        trim:true
    },
    posLocation:{
        type:Number,
        require:true,
    },
    asset:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    },
    controllerA:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'ControllerA', //donde se guardan los controlaores
        require:true
    },
    controllerB:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'ControllerB', //donde se guardan los controlaores
        require:false
    }
})

module.exports = mongoose.model('IOCard', IOCardSchema);