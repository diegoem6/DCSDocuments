const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');
const Device = require('../models/Device');
const DeviceType = require ('../models/DeviceType')

exports.addDevice = async (req,res)=>{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        //existe el asset?
        const asset_updated = await Asset.findById(req.body.asset)
        if (!asset_updated){
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset")
        }

        const {ipDevice} = req.body
        const exist_device = await Device.find({ipDevice:ipDevice})
        if (exist_device){
            console.log("Ya existe un dispositivo con esa IP");
            return res.status(404).send("Ya existe un dispositivo con esa IP")
        }
        const new_device = new Device(req.body);
        await new_device.save()

        res.json({new_device})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo crear el dispositivo, contacte a un administrador"})
        
    }
}

exports.updateDevice = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        //existe el asset?
        const asset_updated = await Asset.findById(req.body.asset)
        if (!asset_updated){
            console.log("No existe el asset");
            return res.status(404).send({msg:"No existe el asset"})
        }

        //existe el modelo?
        /*const model_updated = await Asset.findById(req.body.asset)
        if (!model_updated){
            console.log("No existe el asset");
            return res.status(404).send({msg:"No existe el asset"})
        }*/

        let deviceUpdate = await Device.findById(req.params.id)
        if (!deviceUpdate){
            console.log("No existe el sistema");
            return res.status(404).send({msg:"No existe el nodo de red"})
        }

        const {deviceName, deviceDescription, deviceType, deviceIP} = req.body
        if (deviceName!==null){
            //deviceUpdate.name = deviceName
            deviceUpdate.deviceName = deviceName
        }
        if (deviceDescription!==null){
            deviceUpdate.deviceDescription = deviceDescription
        }
        if (deviceType!==null){
            deviceUpdate.deviceType = deviceType
        }
        if (deviceIP!==null){
            deviceUpdate.deviceIP = deviceIP
        }
        //db.collection.findOneAndUpdate( filter, update, options )
        deviceUpdate = await Device.findOneAndUpdate({_id:req.params.id},deviceUpdate,{new:true});
        res.json({deviceUpdate})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"Error actualizando el dispositivo"})
        
    }
}


exports.getDevices = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const {asset} = req.query;
        //existe el asset?
        //console.log(asset)
        const asset_updated = await Asset.findById(asset)
        if (!asset_updated){
            console.log("No existe el asset");
            return res.status(404).send({res:"No existe el asset"})
        }

        const devices = await Device.find({asset:asset_updated._id}).sort({creado:-1})
        res.json({devices})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los dispositivos para este asset"})
        
    }
}

exports.getDeviceTypes = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const deviceTypes = await DeviceType.find()
        res.json({deviceTypes})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los tipos de dispositivos"})
        
    }
}


exports.getDevice = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idDevice = req.params.id
        //console.log('El ID es: ',idNodo)
        const device_find = await Device.findById(idDevice)
        console.log(device_find)
        if (!device_find){
            console.log("No existe el dispositivo");
            return res.status(404).send("No existe el dispositivo")
        }
        // logica OPC para obtener el status
        let device_get = device_find.toObject()
        device_get.status = []
       
        res.json({device_get})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener el dispositivo, contacte a un administrador"})
        
    }
}





exports.deleteDevice = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idDevice = req.params.id
        const device_delete = await Device.findById(idDevice)
        if (!device_delete){
            console.log("No existe el dispositivo");
            return res.status(404).send("No existe el dispositivo")
        }
        
        //eliminando nodos
        await Device.findOneAndRemove({_id:req.params.id});
        res.json({msg:"Dispositivo eliminado"})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el nodo de red, contacte a un administrador"})
        
    }
}
