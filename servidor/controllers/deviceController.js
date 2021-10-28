const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');
const Device = require('../models/Device');
const DeviceType = require ('../models/DeviceType');
const { getOPC } = require('./commController');

exports.addDevice = async (req,res)=>{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        //existe el asset?
        const asset = await Asset.findById(req.body.asset)
        //console.log(asset)
        if (!asset){
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset")
        }

        //existe el tipo de dispositivo?
        const deviceType = await DeviceType.findById(req.body.deviceType)
        //console.log(deviceType)
        if (!deviceType){
            console.log("No existe el tipo de dispositivo");
            return res.status(404).send("No existe el tipo de dispositivo")
        }

        const {deviceIP} = req.body
        //console.log(deviceIP)
        const exist_device = await Device.find({deviceIP:deviceIP})

        //console.log(exist_device)
        if (typeof exist_device !== 'undefined' && exist_device.length>0){  //si encontró algo, entonces existe
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

        //existe el tipo de dispositivo?
        //console.log(req.body.deviceType)
        const deviceType_updated = await DeviceType.findById(req.body.deviceType)
        //console.log(deviceType_updated)
        if (!deviceType_updated){
            console.log("No existe el tipo de dispositivo");
            return res.status(404).send("No existe el tipo de dispositivo")
        }

        let deviceUpdate = await Device.findById(req.params.id)
        if (!deviceUpdate){
            console.log("No existe el dispositivo");
            return res.status(404).send({msg:"No existe el dispositivo"})
        }

        const {deviceName, deviceDescription, deviceType, deviceIP, deviceURLOPC } = req.body
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
        if (deviceURLOPC!==null){
            deviceUpdate.deviceURLOPC = deviceURLOPC
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

exports.getDeviceTypesByID = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idDevice = req.params.id
        //console.log('El ID es: ',idDevice)
        const device_find = await DeviceType.findById(idDevice)
        //console.log("HOLA",device_find.type)
        if (!device_find){
            console.log("No existe el dispositivo");
            return res.status(404).send("No existe el dispositivo")
        }
        // logica OPC para obtener el status
        let device_type = device_find
        //device_get.status = []
       
        res.json({device_type}) //devuelvo .type, .url y ._id

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener el dispositivo, contacte a un administrador"})
        
    }
}

exports.getDeviceTypes = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const deviceTypes = await DeviceType.find()
        //res.send("HOLA")
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

exports.getOPCItem = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const {data} = req.query
        //const {ip, tipo} = JSON.parse(data)

        const datos_opc = await getOPC('192.168.217.130', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',['ASSETS/PRUEBA/POIANA1.PV','ASSETS/PRUEBA/ALTURA.PV', 'System Components/SRV-500/Controllers/C300_149.CPUFREEAVG'])
        if (!datos_opc){
            console.log("No existe el nodo de red solicitado");
            return res.status(404).send("No existe el nodo de red solicitado")
        }

        //let show_run = await connectTelnetShow(hostname, ip, tipo) //aca guardo el archivo, ver como aviso con urlDoc
        //show_run = `${hostname}-show_${tipo}.txt`
        res.json({datos_opc})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el nodo de red, contacte a un administrador"})
        
    }
}