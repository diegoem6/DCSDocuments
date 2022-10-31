const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');
const IOCard = require('../models/IOCard');
const Cabinet = require ('../models/Cabinet');
const DeviceTypeCabinet = require('../models/DeviceTypeCabinet')
const Device = require('../models/Device');
const DeviceType = require ('../models/DeviceType');
const mongoose = require('mongoose');

//Falta verificar los device index según IOLink para el ADD y el UPDATE

exports.addIOCard = async (req,res)=>{
    console.log("Entro")
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const asset = await Asset.findById(req.body.asset)
        if (!asset){
            console.log("No existe el asset");
            return res.status(404).send({msg:"No existe el asset"})
        }

        const {tagname, type, iolink, deviceIndex, redundant, cabinet, location, controllerA, controllerB} = req.body //recibo por el body todos los campos de la iocard y me quedo solo con el tagname
        //const exist_iocard = await IOCard.find({tagname:tagname}) //campo:valor
        console.log(tagname)
        const exist_iocard = await IOCard.find({tagname:tagname}) //campo:valor
        
        //if (exist_iocard.length === 0){  //si encontró algo, entonces existe
        console.log("Entro aca")
        if (typeof exist_iocard !== 'undefined' && exist_iocard.length>0){  //si encontró algo, entonces existe
            console.log("Entro aca")
            return res.status(500).send({msg: "Ya existe ese tagname de tarjeta"})
        }
        
        //verifico que se ingrese bien la ubicacion:----------------------------
        const tipoIO = await DeviceTypeCabinet.find({_id:type}) // accedo al tamaño de la IO
        //console.log(tipoIO)
        const sizeIO = tipoIO[0].size
        const ioCabinet = await IOCard.aggregate([{ //aggregate agrega capas antes de enviar el resultado
            $lookup:{ //se encarga del join
                from: "devicetypecabinets", //con que colección hago el join - por alguna razon va el nombre de la colecion, no del modelo
                localField: "type", //campo de IOCard
                foreignField: "_id", //campo de tipo IO
                as: "ioType" //este es el alias
                }
            },
            {$unwind: "$ioType"}, //para que el resultado del join (ioType) no venga como array
            {$match: {cabinet: mongoose.Types.ObjectId(cabinet)}} //filtro por el campo cabinet, lo que se encuentra en la variable tagname (convierto de String a ObjectId)
        ]) 
        //const ioCabinet = await IOCard.find({cabinet: cabinet}).sort({side:-1})
        
        const gabinete = await Cabinet.find({_id: cabinet}) // accedo a todas las propiedades del gabinete
        const sizeCabinet = gabinete[0].size; //levanto el tamaño del gabinete
        
        let newLocation = verifyLocation(sizeIO, location, ioCabinet, sizeCabinet)
        
        if (newLocation.error==="Error1"){
            return res.status(500).send({msg:"La ubicación debe contener LB, RB o MB"})
        }
        else if (newLocation.error=="Error2"){
            return res.status(500).send({msg:"La posición debe ser un número, ejemplo: LB-10"})
        }
        else if (newLocation.error=="Error3"){
            return res.status(500).send({msg:"La ubicación de la tarjeta supera los límites del gabinete."})
        }
        else if (newLocation.error=="Error4"){
            return res.status(500).send({msg: `La ubicación donde se quiere agregar la tarjeta se encuentra ocupada por: ${newLocation.valor}`})
        }
        else{  
            const new_iocard = new IOCard({"tagname":  tagname, "type":type, "iolink":iolink, "deviceIndex":deviceIndex, "redundant":redundant,
                       "cabinet":cabinet, "sideLocation": newLocation.side, "posLocation": newLocation.position, "location": location, "asset": asset, "controllerA":controllerA, "controllerB": controllerB});
            await new_iocard.save()
            res.json(new_iocard)
        }
        //res.json("HOLA")
    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo crear la tarjeta con ese tagname, contacte a un administrador"})
        
    }
}

exports.updateIOCard = async (req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const asset = await Asset.findById(req.body.asset)
        if (!asset){
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset")
        }

        //console.log(req.params.id)
        let iocardUpdate = await IOCard.findById(req.params.id)
        //console.log(iocardUpdate)
        if (!iocardUpdate){
            //console.log("No existe el dispositivo");
            return res.status(404).send({msg:"No existe la tarjeta IO"})
        }
        const {tagname, type, iolink, deviceIndex, redundant, cabinet, location, controllerA, controllerB} = req.body //recibo por el body todos los campos de la iocard y me quedo solo con el tagname
        
        //verifico que el tagname no se encuentre repetido:
        iocardUpdate.tagname = tagname
        //****************************************** */
        iocardUpdate.type = type
        iocardUpdate.iolink = iolink
        iocardUpdate.deviceIndex = deviceIndex
        iocardUpdate.redundant = redundant
        iocardUpdate.location = location
        iocardUpdate.cabinet = cabinet
        iocardUpdate.controllerA = controllerA
        if (controllerB!==null){
            iocardUpdate.controllerB = controllerB
        }        
        console
        //verifico que se ingrese bien la ubicacion:----------------------------
        const tipoIO = await DeviceTypeCabinet.find({_id:type}) // accedo al tamaño de la IO
        //console.log(tipoIO)
        const sizeIO = tipoIO[0].size
        //console.log("El tagnames es: ",tagname)
        //console.log("El gabinete es: ",cabinet)
        //console.log('El IOCard es: ', iocardUpdate._id)
        //LEVANTO TODAS LAS IO QUE ESTAN EN EL GABINETE
        const ioCabinet = await IOCard.aggregate([{ //aggregate agrega capas antes de enviar el resultado
            $lookup:{ //se encarga del join
                from: "devicetypecabinets", //con que colección hago el join - por alguna razon va el nombre de la colecion, no del modelo
                localField: "type", //campo de IOCard
                foreignField: "_id", //campo de tipo IO
                as: "ioType" //este es el alias
                }
            },
            {$unwind: "$ioType"}, //para que el resultado del join (ioType) no venga como array
            {$match: {cabinet: mongoose.Types.ObjectId(cabinet), _id: {$ne: mongoose.Types.ObjectId(iocardUpdate._id)}}} //filtro por el campo cabinet, y sin la IOCard que quiero actualizar apra verificar ubicaciones
        ])
        //console.log("BOOLOOLOLOLO", ioCabinet)
        const gabinete = await Cabinet.find({_id: cabinet}) // accedo a todas las propiedades del gabinete
        const sizeCabinet = gabinete[0].size; //levanto el tamaño del gabinete
        
        //console.log( sizeIO,"-", location,"-", ioCabinet,"-", sizeCabinet)
        let newLocation = verifyLocation(sizeIO, location, ioCabinet, sizeCabinet)
        //console.log(newLocation)
        if (newLocation.error==="Error1"){
            return res.status(500).send(errors[{msg:"La ubicación debe contener LB, RB o MB"}])
        }
        else if (newLocation.error=="Error2"){
            return res.status(500).send({msg:"La posición debe ser un número, ejemplo: LB-10"})
        }
        else if (newLocation.error=="Error3"){
            return res.status(500).send({msg:"La ubicación de la tarjeta supera los límites del gabinete."})
        }
        else if (newLocation.error=="Error4"){
            return res.status(500).send({msg: `La ubicación donde se quiere agregar la tarjeta se encuentra ocupada por: ${newLocation.valor}`})
        }
        else{  
            iocardUpdate.sideLocation = newLocation.side
            iocardUpdate.posLocation = newLocation.position
            //console.log("Actualizando")
            //console.log(iocardUpdate)
            iocardUpdate = await IOCard.findOneAndUpdate({_id:req.params.id},iocardUpdate,{new:true});
            return res.json({iocardUpdate})
        }
        //res.json("HOLA")
    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo crear la tarjeta con ese tagname, contacte a un administrador"})
        
    }
}


exports.getIOCard = async (req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idIOCard = req.params.id
        //console.log('El ID es: ',idNodo)
        const iocard_find = await IOCard.findById(idIOCard)
        if (!iocard_find){
            return res.status(404).send("No existe la tarjeta con ese tagname")
        }
        // logica OPC para obtener el status
        let iocard_get = iocard_find.toObject()
       
        res.json({iocard_get})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener la tarjeta con ese tagname, contacte a un administrador"})
        
    }
}

exports.deleteIOCard = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idIOCard = req.params.id
        const iocard_delete = await IOCard.findById(idIOCard)
        //const tagname = iocard_delete.tagname
        if (!iocard_delete){
            return res.status(404).send("No existe la tarjeta con ese tagname")
        }
        
        //eliminando nodos
        await IOCard.findOneAndRemove({_id:req.params.id});
        res.json({msg:`La Tarjeta ${iocard_delete.tagname} fue eliminada`})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar la tarjeta con ese tagname, contacte a un administrador"})
        
    }
}


exports.getIOCardsCabinets = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const iocards = await IOCard.find({cabinet:req.params.id}).sort({creado:-1})
        res.json({iocards})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los dispositivos para este asset"})
        
    }
}


exports.getIOCards = async (req,res)=>{
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

        const oldIOCards = await IOCard.find({asset:asset_updated._id}).sort({tagname:1})
        let iocards = []
        //Levanto todas las IOs existentes pero con el tipo de IO no con el id, para mostrar y listar todas las IOs por asset inicialmente
        for (const io of oldIOCards){
            const typeDesc = await this.igetIOCardType(io.type)
            const cabinetDesc = await this.igetIOCardCabinet(io.cabinet)
            //console.log(cabinetDesc)
            let newIO = io.toObject();
            newIO.typeDesc = typeDesc
            newIO.cabinetDesc = cabinetDesc
            iocards.push(newIO)
        }
        res.json({iocards})
    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los dispositivos para este asset"})
    }
}

exports.getIOCardsAll = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
                
        const oldIOCards = await IOCard.find().sort({creado:-1})
        let iocards = []
        //Levanto todas las IOs existentes pero con el tipo de IO no con el id, para mostrar y listar todas las IOs por asset inicialmente
        for (const io of oldIOCards){
            const typeDesc = await this.igetIOCardType(io.type)
            const cabinetDesc = await this.igetIOCardCabinet(io.cabinet)
            //console.log(cabinetDesc)
            let newIO = io.toObject();
            newIO.typeDesc = typeDesc
            newIO.cabinetDesc = cabinetDesc
            iocards.push(newIO)
        }
        
        res.json({iocards})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los dispositivos para este asset"})
        
    }
}


exports.getIOCardControllersAll = async (req,res)=>{ //levanto todos los controladores
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const idC300 = await DeviceType.find({type:"C300"})
        const allControllers = await Device.find({deviceType:idC300}).sort({deviceName:1}) //filtro por C300
       
        res.json({allControllers})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los conttroladores"})
        
    }
}

exports.getIOCardControllersA = async (req,res)=>{ //levanto todos los controladores excepto los que terminan en B
    //console.log("En el controllerA")
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const idC300 = await DeviceType.find({type:"C300"})
        const allControllers = await Device.find({$and:[{deviceType:idC300},{deviceName:{ $not: /B$/ }}]}).sort({deviceName:1}) //filtro por C300 y los devicename, $ => indica que termina en B (que no termine con la letra B)
        res.json({allControllers})
        
    } catch ({error}) {
        res.status(500).send({msg:"No se pudo obtener los controladores"})
        
    }
}

exports.getIOCardCabinetsAll = async (req,res)=>{ 
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const cabinets = await Cabinet.find()
        
        res.json({cabinets})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudieron obternet los gabinetes"})
        
    }
}


exports.igetIOCardType = async (id) =>{
    try {
        const iocardType_find = await DeviceTypeCabinet.findById(id)
        //console.log(iocardType_find)
        if (!iocardType_find){
            return ("Error tipo de dispositivo")
        }
        return iocardType_find.type //iocardType_find.type //devuelvo el tipo de dispositivo (AI, AO, DI, DO, Bateria, etc)
    } catch ({error}) {
        console.log(error);
    }
}

exports.igetIOCardCabinet = async (id) =>{
    try {
        const iocardCabinet_find = await Cabinet.findById(id)
        //console.log(iocardType_find)
        if (!iocardCabinet_find){
            return ("Error Gabinete")
        }
        //console.log (iocardCabinet_find.cabinetName)
        return iocardCabinet_find.cabinetName //iocardType_find.type //devuelvo el tipo de dispositivo (AI, AO, DI, DO, Bateria, etc)
    } catch ({error}) {
        console.log(error);
    }
}

exports.getIOCardType = async (req, res) =>{ //levanto el tipo de IO a partir del id de la IO
    try {
        const iocardType_find = await DeviceTypeCabinet.findById(req.params.id)
        console.log(iocardType_find)
        if (!iocardType_find){
            console.log("No existe el tipo de dispositivo");
            return res.status(404).send("No existe el tipo de dispositivo")
        }
        return res.status(500).send({type:iocardType_find.type, size:iocardType_find.size}) //iocardType_find.type //devuelvo el tipo de dispositivo (AI, AO, DI, DO, Bateria, etc)
    } catch ({error}) {
        console.log(error);
    }
}



exports.getIOCardTypesAll = async (req, res) =>{ //levanto todos los tipos de IO que hay en BD
    
    try {
        const iocardTypes_all = await DeviceTypeCabinet.find()//.sort({creado:-1})
        //console.log(iocardTypes_all) //llega bien
        if (!iocardTypes_all){
            console.log("No existe el tipo de dispositivo");
            return res.status(404).send("No existe el tipo de dispositivo")
        }
        return res.json({iocardTypes_all}) //iocardType_find.type //devuelvo el tipo de dispositivo (AI, AO, DI, DO, Bateria, etc)
    } catch ({error}) {
        console.log(error);
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

        const oldDevices = await Device.find({asset:asset_updated._id}).sort({creado:-1})
       
        let devices = []

        for (const dev of oldDevices){
            const typeDesc = await this.igetDeviceType(dev.deviceType)
            let newDev = dev.toObject();
            newDev.deviceTypeDesc = typeDesc
            devices.push(newDev)
        }
        
        res.json({devices})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los dispositivos para este asset"})
        
    }
}

exports.getDeviceType = async (id) =>{
   
    try {
        //revisar el id
        const idDevice = id
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
       return device_type.type //devuelvo .type, .url y ._id

    } catch ({error}) {
        console.log(error);
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

exports.getDeviceID = async (req,res)=>{
    //console.log("ACA")
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const {deviceName} = req.query; //del params levanto el dato del device
        //otra forma: req.query.networknode
        //console.log("El device es", req.query)
        //const idnetworknodeconsulta = await NetworkNode.find({nodeName:'PMSWSE221A'})
        const devices = await Device.find({deviceName: deviceName})
        //console.log(idnetworknodeconsulta)
        const idDevice = devices[0]._id
        if (!idDevice){
            console.log("No existe el device");
            return res.status(404).send("No existe el device")
        }
                
        res.json({idDevice})//envío el id del nodo
    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener el dispositivo, contacte a un administrador"})
        
    }
}


const verifyLocation = (sizeIO, location, ioCabinet, sizeCabinet) => {
    let error;
    let valor;
    //********************************************** */
    const side = location.substr(0,2);
    if (side!=="LB" && side!=="MB" && side !="RB"){
        error="Error1"
        return ({error})
    }
   //********************************************** */
    let position
    if (location.length === 5)
        position = parseInt(location.substr(3,location.length - 2));
    else if (location.length === 4)
        position = parseInt(location.substr(3,location.length - 1));
    
    if (isNaN(position)){
        error="Error2"
        return ({error})
    }  
    //********************************************** */
    let ocupacion = sizeIO - 1 //tamaño de la IO que se quiere agregar
    let ioOcupacion; //tamaño de las IOs que se encuentran en el gabinete
    
    //console.log(position+ocupacion, " - ", sizeCabinet);
    if (position+ocupacion > sizeCabinet){ //verifico si donde se quiere agregar supera los limites del gabinete
        error="Error3"
        return ({error})
    }
    //********************************************** */
    //filter by side and cabinet
    for (const io of ioCabinet){ //verifico si esa ubicación se encuentra ocupada
        ioOcupacion = (io.ioType.size) - 1
        //console.log("La ocupacion es: ",ioOcupacion)
        if (io.sideLocation === side){
            //console.log(io)
            if(((position >=io.posLocation) && (position <= io.posLocation+ioOcupacion)) ||
                ((position+ocupacion >=io.posLocation) && (position+ocupacion <= io.posLocation+ioOcupacion)) ||
                ((io.posLocation >= position) && (io.posLocation+ioOcupacion <= position))){ //cuando la tarjeta existente se encuentra entre medio de la que se quiere agregar
                    //console.log("La IO que se encuentra ahi es: ",io)
                    error="Error4"
                    valor=io.tagname
                    return ({error, valor})
                }
            }
    }
    //********************************************** */
    return ({side, position})
}



