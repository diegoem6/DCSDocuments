const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');
const Device = require('../models/Device');
const DeviceType = require ('../models/DeviceType');
const { getOPC } = require('./commController');
const connSQL = require('../config/sql');

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
    //console.log("ACA")
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


exports.getC300 = async (req, res) => {
    //recibo el id y obtengo los datos de opc http://localhost:4000/api/devices/c300/614bd69bf9b2ced7610d0d43
    const idDevice = req.params.id
    const device = await Device.findById(idDevice)
    //console.log(device.deviceURLOPC, device.deviceIP, device.deviceName)
    let state=[
        {property:"C300STATE"},{property:"lanafailed"},{property:"lanbfailed"},{property:"cpufreeavg"},{property:"ctemp"},
        {property:"rdnrolestate"},{property:"interlanfailed"},{property:"xoverfailed"}
    ]
    //console.log(datosC300prop)
    let opc=[]
    state.forEach(datos => {
        opc.push(device.deviceURLOPC + "/" + device.deviceName + "." + datos.property)
    })
    //console.log(opc)    
    try {
       
        let datos_opc = await getOPC('192.168.217.139', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',opc)//['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
        if (!datos_opc){
            console.log("Hubo errores en la consulta. Contacte al administrador.");
            return res.status(404).send("Hubo errores en la consulta. Contacte al administrador.")
        }

        let aux0=""
        switch(datos_opc[0].value){
            case 0: aux0="OFFNET"
            break;
            case 1: aux0="TESTING"
            break;
            case 2: aux0="BOOTING"
            break;
            case 3: aux0="ALIVE"
            break;
            case 4: aux0="LOADING"
            break;
            case 5: aux0="OK"
            break;
            case 6: aux0="FAILED"
            break;
            case 7: aux0="PIREADY"
            break;
            case 8: aux0="BACKUP"
            break;
            case 9: aux0="NOTLOADED"
            break;
            case 10: aux0="NOCEE"
            break;
            case 11: aux0="CEEIDLE"
            break;
            case 12: aux0= "CEERUN"
            break;
            case 13: aux0="CEEMIX"
            break;
            case 14: aux0="TIMESOURCE"
            break;
            default: aux0="NaN"
        }
        let aux1=""
        switch(datos_opc[5].value){
            case 0: aux1="Undefined"
            break;
            case 1: aux1="NonRedun"
            break;
            case 2: aux1="Primary"
            break;
            case 3: aux1="Secondary"
            break;
            default: aux1="NaN"
        }
        //let state=[ //array que voy a llenar con objetos que tienen las propiedades
        state=[
            {property:"C300STATE", type:"value", label: "Status", value: aux0},
            {property:"lanafailed", type:"icon", label: "FTE A", value: datos_opc[1].value},
            {property:"lanbfailed", type:"icon", label: "FTE B", value: datos_opc[2].value},
            {property:"cpufreeavg", type:"value", label: "CPU Free (%)", value: datos_opc[3].value},
            {property:"ctemp", type:"value", label: "Temp (°C)", value: datos_opc[4].value},
            {property:"rdnrolestate", type:"value", label: "Redundancy", value: aux1},
            {property:"interlanfailed", type:"icon", label: "FTE InterLAN comm. failed", value: datos_opc[6].value},
            {property:"xoverfailed", type:"icon", label: "FTE crossover cable field", value: datos_opc[7].value}
        ]

        let softfailure=[
            //{property:"BATTERYNOTOKSFTAB", label: "Battery State Warning",value: "NaN"}//BATTERYNOTOKSFTAB, 
            {property:"BCDSWSTS"},{property:"FACTDATAERR"},{property:"ROMAPPIMGCHKSMFAIL"},{property:"ROMBOOTIMGCHKSMFAIL"},{property:"WDTHWFAIL"},{property:"WDTSWFAIL"},
            {property:"TASKHLTHMON"},{property:"RAMSWEEPERR"},{property:"RAMSCRUBERRS"},{property:"BACKUPRAMSWEEPERR"},{property:"BACKUPRAMSCRUBERRS"},
            {property:"IOL1SOFTFAIL"},{property:"IOL2SOFTFAIL"},{property:"DEBUGFLAGSET"},{property:"MINHWREVSF"},{property:"PARTNERNOTVISFTE"}
        ]

        opc=[]
        softfailure.forEach(datos => {
            opc.push(device.deviceURLOPC + "/" + device.deviceName + "." + datos.property)
        })
        //console.log(opc)
        datos_opc = await getOPC('192.168.217.139', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',opc)//['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
        if (!datos_opc){
            console.log("Hubo errores en la consulta. Contacte al administrador.");
            return res.status(404).send("Hubo errores en la consulta. Contacte al administrador.")
        }

        softfailure=[
            {property:"BCDSWSTS", label: "Battery State Warning",value: datos_opc[0].value}, // debería ser: BATTERYNOTOKSFTAB, 
            {property:"BCDSWSTS", label: "Device Index Switches Changed",value: datos_opc[1].value},
            {property:"FACTDATAERR", label: "Factory Data Error",value: datos_opc[2].value},
            {property:"ROMAPPIMGCHKSMFAIL", label: "ROM Application Image Checksum Failure",value: datos_opc[3].value},
            {property:"ROMBOOTIMGCHKSMFAIL", label: "ROM Boot Image Checksum Failure",value: datos_opc[4].value},
            {property:"WDTHWFAIL", label: "WDT Hardware Failure",value: datos_opc[5].value},
            {property:"WDTSWFAIL", label: "WDT Refresh Warning",value: datos_opc[6].value},
            {property:"TASKHLTHMON", label: "Critical Task Watchdog Warning",value: datos_opc[7].value},
            {property:"RAMSWEEPERR", label: "Uncorrectable Internal RAM Sweep Error",value: datos_opc[8].value},
            {property:"RAMSCRUBERRS", label: "Corrected Internal RAM Sweep Error",value: datos_opc[9].value},
            {property:"BACKUPRAMSWEEPERR", label: "Uncorrected User RAM Sweep Error",value: datos_opc[10].value},
            {property:"BACKUPRAMSCRUBERRS", label: "Corrected User RAM Sweep Error",value: "oNaNn"},
            {property:"IOL1SOFTFAIL", label: "IOLINK(1) Soft Fail Error",value: datos_opc[11].value},
            {property:"IOL2SOFTFAIL", label: "IOLINK(2) Soft Fail Error",value: datos_opc[12].value},
            {property:"DEBUGFLAGSET", label: "Debug Flag Enabled",value: datos_opc[13].value},
            {property:"MINHWREVSF", label: "Minimum HW Revision",value: datos_opc[14].value},
            {property:"PARTNERNOTVISFTE", label: "Partner Not Visible on FTE",value: datos_opc[15].value}
        ]

        //console.log(state)
        const c300={state, softfailure}
        res.json({c300});
        //res.json({datos_opc});
    }
    catch(error){
        console.log(error);
         res.status(500).send("Error al visualizar el C300")
    }
}


exports.getPGM = async(req, res) =>{
    //icon4 para NETWORKSLAVELED[numSalve]
    //recibo el id y obtengo los datos de opc http://localhost:4000/api/devices/pgm/614bd69bf9b2ced7610d0d43
    const idDevice = req.params.id
    const device = await Device.findById(idDevice)

    console.log(device.deviceURLOPC, device.deviceIP, device.deviceName)

    let resp=""//, StID;
    const json_error = [{"PBLINK": "No existe ningún PBLINK asociado con esa IP"}]
    //resp = json_error;
    pgm=[];
    pgm_item={};
    pblink=[];
    slaves = [];
    item = {}
    let i=1

    try {
        
        const ip = req.params.ip
//        console.log(req.params.ip)
        servidor='localhost'; //POR PARAMETRO
        //console.log('El server es:', servidor);
        
        const conn = await connSQL.conectarSQL('localhost');
        let pool = await conn.connect();
        //StrategyID de los 2 pblinks:********************
        resp = await pool.request()
            /*.query(`SELECT AreaName, Source AS Tagname, Block, AlarmLimit, ConditionName, Description, Action, Priority, Actor, Value, [EMSEvents].dbo.UTCFILETIMEToDateTime(LocalTime) as Fecha FROM [EMSEvents].dbo.Events where Source like '${TAG}'
            AND dbo.UTCFILETIMEToDateTime(LocalTime) >= DATEADD(day, -1, GETDATE())`)*/
            .query(`select spv.StrategyID from (STRATEGY_PARAM_VALUE spv inner join PARAM_DEF pd on spv.ParamID=pd.ParamID inner join TEMPLATE as t on t.TemplateID=pd.TemplateID) where (spv.StringValue='${ip}' and pd.paramname='NETIP' and t.templatename='PBLINK')`)
        
        if (!resp.recordset[0]){
            resp = json_error;
            res.json({resp});
            conn.close();
            return;
        }
        //********************************************* */
        //Obtengo los nombres de los 2 pblinks:********************
        //var index_pblink=-1
        //var index_pblname=-1
        for (pblink_id of resp.recordset){
            //console.log(pblink_id.StrategyID)
            respPBL = await pool.request()
                .query(`select spv.StringValue from (STRATEGY_PARAM_VALUE spv inner join PARAM_DEF pd on spv.ParamID=pd.ParamID inner join TEMPLATE as t on t.TemplateID=pd.TemplateID) where (spv.StrategyID=${pblink_id.StrategyID} and pd.ParamName='NETBLOCKNAME' and t.templatename='PBLINK')`)
                if (!respPBL.recordset[0]){
                    resp = json_error;
                    res.json({resp});
                    conn.close();
                    return;
                }
                
                //console.log(respPBL.recordset[0].StringValue)
                //Obtengo los nombres de los esclavos con sus id's, a partir de los nombres de los pblinks:
                respName_DSB = await pool.request()
                    .query(`select s.StrategyID, s.StrategyName from (strategy s inner join TEMPLATE t on s.TemplateID=t.TemplateID) where EEC=(select EEC from STRATEGY where StrategyName='${respPBL.recordset[0].StringValue}') and t.templatename='GENDSBDP'`)
                    
                    for(DSB of respName_DSB.recordset){
                        //console.log(respPBL.recordset[0].StringValue, ': ', DSB.StrategyName, DSB.StrategyID)
                
                        //a partir de cada StrategyID de los DSB, obtengo el numero de esclavo:
                        respNum_DSB = await pool.request()
                            .query(`select spv.IntegerValue from (STRATEGY_PARAM_VALUE spv  inner join PARAM_DEF p on p.ParamID=spv.ParamID inner join TEMPLATE t on p.TemplateID=t.TemplateID) where (spv.StrategyID=${DSB.StrategyID} and p.ParamName='SLAVEADDRESS' and t.templatename='GENDSBDP')`)
                        
                        //a partir de cada StrategyID de los DSB, obtengo el tipo de esclavo:
                        respTipo_DSB = await pool.request()
                            .query(`select spv.StringValue from (STRATEGY_PARAM_VALUE spv  inner join PARAM_DEF p on p.ParamID=spv.ParamID inner join TEMPLATE t on p.TemplateID=t.TemplateID) where (StrategyID=${DSB.StrategyID} and p.ParamName='DESC' and t.templatename='GENDSBDP')`)

                            item={
                                DSB_Name: DSB.StrategyName,
                                Slave_Num: respNum_DSB.recordset[0].IntegerValue, 
                                Slave_Tipo: respTipo_DSB.recordset[0].StringValue
                            }
                            slaves.push(item);
                            console.log(respPBL.recordset[0].StringValue, ': ', DSB.StrategyName, '(',respNum_DSB.recordset[0].IntegerValue, ') - ', respTipo_DSB.recordset[0].StringValue)//, DSB.StrategyID)

                    }
                    const key="PBLINK"+i //respPBL.recordset[0].StringValue //nombre PBLINK
                    i=i+1
                    var obj = {};
                    //consultas OPC:
                    pgm_item["name"]=respPBL.recordset[0].StringValue //nombre PBLINK
                    pgm_item["linknum"]=0
                    pgm_item["fielnetwrktype"]="PROFIBUS DP"
                    pgm_item["cpuload"]=70
                    
                    data=getOPCItems('192.168.217.130', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
                    console.log(data)
                    //recorrer el json 

                    if (!respName_DSB.recordset[0]){
                        console.log(respPBL.recordset[0].StringValue, ': No hay DSB asociados')
                        obj[key] = {slaves: [], properties: pgm_item};
                        pgm.push(obj)
                    }
                    else{
                        obj[key]={slaves: slaves, properties: pgm_item}
                        pgm.push(obj)
                        
                    }
                    slaves = [];
                    pgm_item={};
        }      

        res.json({pgm});
        //res.json(json_error)
        //***** */
        //res.json({resp});
        conn.close();
        return;
        
     } catch (error) {
         console.log(error);
         res.status(500).send("Error al visualizar el PBLINK--")
     }
}

exports.getOPCItems = (req, res) =>{
//const getOPCItems=async(ip, domain, user, pass, clsid, opc_route) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        
        /*const datos_opc = await getOPC('192.168.217.130', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
        if (!datos_opc){
            console.log("No existe el nodo de red solicitado");
            return res.status(404).send("No existe el nodo de red solicitadno")
        }*/
        const datos_opc=[
            {name:"linknum",value: 1} ,
            {"fielnetwrktype": "PROFIBUS DP"}
        ]
        //json que devuelve nombre del campo y valor (NAN en caso que quality <> 192)
        res.json({datos_opc})
        
       res.json(ip)
    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el nodo de red, contacte a un administrador"})
        
    }
}

/*exports.getOPCItem = async(req, res) => {
    //console.log("Entroooo")
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const {data} = req.query
        //const {ip, tipo} = JSON.parse(data)

        const datos_opc = await getOPC('192.168.217.130', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
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
*/

