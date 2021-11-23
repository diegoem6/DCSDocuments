const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');
const Device = require('../models/Device');
const DeviceType = require ('../models/DeviceType');
const { getOPC } = require('./commController');
const connSQL = require('../config/sql');
const {findServer} = require('./commonController')

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


const getC300 = async (device, res) => {
    //recibo el id y obtengo los datos de opc http://localhost:4000/api/devices/c300/614bd69bf9b2ced7610d0d43
    //const idDevice = req.params.id
    //const device = await Device.findById(idDevice)
    //console.log(device.deviceURLOPC, device.deviceIP, device.deviceName)
    let state=["C300STATE","lanafailed","lanbfailed","cpufreeavg","ctemp","rdnrolestate","interlanfailed","xoverfailed"]
    //console.log(datosC300prop)
    let opc=[]
    const servidor=findServer(device.deviceName)
    //console.log(servidor)
    //const servidor = '192.168.217.139'
    state.forEach(datos => {
        opc.push(device.deviceURLOPC + "/" + device.deviceName + "." + datos)
    })
    //console.log(opc)    
    try {
       
        let datos_opc = await getOPC(servidor, 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',opc)//['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
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
            //"BATTERYNOTOKSFTAB",
            "BCDSWSTS", "BCDSWSTS","FACTDATAERR","ROMAPPIMGCHKSMFAIL","ROMBOOTIMGCHKSMFAIL","WDTHWFAIL","WDTSWFAIL",
            "TASKHLTHMON","RAMSWEEPERR","RAMSCRUBERRS","BACKUPRAMSWEEPERR","BACKUPRAMSCRUBERRS",
            "IOL1SOFTFAIL","IOL2SOFTFAIL","DEBUGFLAGSET","MINHWREVSF","PARTNERNOTVISFTE"
        ]

        opc=[]
        softfailure.forEach(datos => {
            opc.push(device.deviceURLOPC + "/" + device.deviceName + "." + datos)
        })
        //console.log(opc)
        datos_opc = await getOPC('192.168.217.139', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',opc)//['ASSETS/PRUEBA/H101.pv','ASSETS/PRUEBA/POIANA1.pv', 'System Components/SRV-500/Controllers/C300_165.CPUFREEAVG'])
        if (!datos_opc){
            console.log("Hubo errores en la consulta. Contacte al administrador.");
            return res.status(404).send("Hubo errores en la consulta. Contacte al administrador.")
        }

        softfailure=[
            {property:"BCDSWSTS", label: "Battery State Warning", type:"icon4", value: datos_opc[0].value}, // debería ser: BATTERYNOTOKSFTAB, //tiene 0,1,2,3 estados, 0=OK (verde), 1=Undervoltage (amarillo), 2=Overvoltage (rojo) 3=unknown (gris)
            {property:"BCDSWSTS", label: "Device Index Switches Changed", type:"icon",value: datos_opc[1].value},
            {property:"FACTDATAERR", label: "Factory Data Error", type:"icon",value: datos_opc[2].value},
            {property:"ROMAPPIMGCHKSMFAIL", label: "ROM Application Image Checksum Failure", type:"icon",value: datos_opc[3].value},
            {property:"ROMBOOTIMGCHKSMFAIL", label: "ROM Boot Image Checksum Failure", type:"icon",value: datos_opc[4].value},
            {property:"WDTHWFAIL", label: "WDT Hardware Failure", type:"icon",value: datos_opc[5].value},
            {property:"WDTSWFAIL", label: "WDT Refresh Warning", type:"icon",value: datos_opc[6].value},
            {property:"TASKHLTHMON", label: "Critical Task Watchdog Warning", type:"icon",value: datos_opc[7].value},
            {property:"RAMSWEEPERR", label: "Uncorrectable Internal RAM Sweep Error", type:"icon",value: datos_opc[8].value},
            {property:"RAMSCRUBERRS", label: "Corrected Internal RAM Sweep Error", type:"icon",value: datos_opc[9].value},
            {property:"BACKUPRAMSWEEPERR", label: "Uncorrected User RAM Sweep Error", type:"icon",value: datos_opc[10].value},
            {property:"BACKUPRAMSCRUBERRS", label: "Corrected User RAM Sweep Error", type:"icon",value: datos_opc[11].value},
            {property:"IOL1SOFTFAIL", label: "IOLINK(1) Soft Fail Error", type:"icon",value: datos_opc[12].value},
            {property:"IOL2SOFTFAIL", label: "IOLINK(2) Soft Fail Error", type:"icon",value: datos_opc[13].value},
            {property:"DEBUGFLAGSET", label: "Debug Flag Enabled", type:"icon",value: datos_opc[14].value},
            {property:"MINHWREVSF", label: "Minimum HW Revision", type:"icon",value: datos_opc[15].value},
            {property:"PARTNERNOTVISFTE", label: "Partner Not Visible on FTE", type:"icon",value: datos_opc[16].value}
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


const getPGM = async(device, res) =>{
    //type="icon4" para NETWORKSLAVELED[numSalve]:
        //0=LEDINACTIVE
        //1=LEDRED
        //2=LEDGREEN
        //3=LEDYELLOW
    //recibo el id y obtengo los datos de opc http://localhost:4000/api/devices/pgm/614bd69bf9b2ced7610d0d43
    
    /*const idDevice = req.params.id
    const device = await Device.findById(idDevice)
    */
    //console.log(device.deviceURLOPC, device.deviceIP, device.deviceName)
    const ip = device.deviceIP
    const servidor=findServer(device.deviceName)
    //console.log(servidor)
    //const servidor = 'localhost'

    let resp=""//, StID;
    const json_error = [{"PBLINK": "No existe ningún PBLINK asociado con esa IP"}]
    //resp = json_error;
    pgm=[];
    pblink_item=[];
    pblink=[];
    slaves_aux = [];
    slaves=[];
    item = {}
    let i=1

    try {
                
        const conn = await connSQL.conectarSQL(servidor);
        let pool = await conn.connect();
        //StrategyID de los 2 pblinks:********************
        resp = await pool.request()
            /*.query(`SELECT AreaName, Source AS Tagname, Block, AlarmLimit, ConditionName, Description, Action, Priority, Actor, Value, [EMSEvents].dbo.UTCFILETIMEToDateTime(LocalTime) as Fecha FROM [EMSEvents].dbo.Events where Source like '${TAG}'
            AND dbo.UTCFILETIMEToDateTime(LocalTime) >= DATEADD(day, -1, GETDATE())`)*/
            .query(`select spv.StrategyID from (STRATEGY_PARAM_VALUE spv inner join PARAM_DEF pd on spv.ParamID=pd.ParamID inner join TEMPLATE as t on t.TemplateID=pd.TemplateID) where (spv.StringValue='${ip}' and pd.paramname='NETIP' and t.templatename='PBLINK' and spv.StrategyID < 0)`)
        
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
            .query(`select s.StrategyID, s.StrategyName from (strategy s inner join TEMPLATE t on s.TemplateID=t.TemplateID) where EEC=(select EEC from STRATEGY where StrategyName='${respPBL.recordset[0].StringValue}' and t.templatename not like 'PBLINK')`) //'GENDSBDP' or t.templatename='DRIVEDSBDP')`)
            
            for(DSB of respName_DSB.recordset){ //armo todos los esclavos
                //console.log(respPBL.recordset[0].StringValue, ': ', DSB.StrategyName, DSB.StrategyID)
        
                //a partir de cada StrategyID de los DSB, obtengo el numero de esclavo:
                respNum_DSB = await pool.request()
                    .query(`select spv.IntegerValue from (STRATEGY_PARAM_VALUE spv  inner join PARAM_DEF p on p.ParamID=spv.ParamID inner join TEMPLATE t on p.TemplateID=t.TemplateID) where (spv.StrategyID=${DSB.StrategyID} and p.ParamName='SLAVEADDRESS' and t.templatename not like 'PBLINK')`) 
                //console.log(DSB.StrategyName, " - ", DSB.StrategyID,"-", respNum_DSB.recordset[0].IntegerValue)
                //a partir de cada StrategyID de los DSB, obtengo el tipo de esclavo:
                respTipo_DSB = await pool.request()
                    .query(`select spv.StringValue from (STRATEGY_PARAM_VALUE spv  inner join PARAM_DEF p on p.ParamID=spv.ParamID inner join TEMPLATE t on p.TemplateID=t.TemplateID) where (StrategyID=${DSB.StrategyID} and p.ParamName='DESC' and t.templatename not like 'PBLINK')`) 
                    //console.log('el tipo de dispositivo: ',respTipo_DSB.recordset[0].StringValue)
                    if(respTipo_DSB.recordset[0])
                        tipo=respTipo_DSB.recordset[0].StringValue
                    else
                        {respTipo_DSB = await pool.request()
                            .query(`select spv.StringValue from (STRATEGY_PARAM_VALUE spv  inner join PARAM_DEF p on p.ParamID=spv.ParamID inner join TEMPLATE t on p.TemplateID=t.TemplateID) where (StrategyID=${DSB.StrategyID} and p.ParamName='DEVICETYPE' and t.templatename not like 'PBLINK')`) 
                            if(respTipo_DSB.recordset[0])
                                tipo=respTipo_DSB.recordset[0].StringValue
                             else
                                tipo='Unknown'
                        }
                    item={
                        DSB_Name: DSB.StrategyName,
                        slave_Num: respNum_DSB.recordset[0].IntegerValue, 
                        slave_Tipo: tipo
                    }
                    //item.state="on"
                    slaves_aux.push(item);
                    //console.log(respPBL.recordset[0].StringValue, ': ', DSB.StrategyName, '(',respNum_DSB.recordset[0].IntegerValue, ') - ', respTipo_DSB.recordset[0].StringValue)//, DSB.StrategyID)
                    console.log(respPBL.recordset[0].StringValue, ': ', DSB.StrategyName, '(',respNum_DSB.recordset[0].IntegerValue, ')')//, DSB.StrategyID)

            }
            //slaves_aux[0].state="on"
            //Consulta los estados de los esclavos del PBLINK - armo los OPC:
            let opc=[]
            const pblink_name= respPBL.recordset[0].StringValue //nombre PBLINK
            opc.push(device.deviceURLOPC + "/" + pblink_name + ".linknum")
            opc.push(device.deviceURLOPC + "/" + pblink_name + ".fielnetwrktype")
            opc.push(device.deviceURLOPC + "/" + pblink_name + ".cpuload")
            opc.push(device.deviceURLOPC + "/" + pblink_name + ".state")

            slaves_aux.forEach(datos => {
                opc.push(device.deviceURLOPC + "/" + pblink_name + ".NETWORKSLAVELED[" + datos.slave_Num + "]")
            })
            console.log(opc)    
            try {
                let datos_opc = await getOPC(servidor, 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',['System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG']) //,opc
                //datos_opc=[{"value": 0},{"value": "PROFIBUS PA"}, {"value": 70}, {"value": 2}, {"value": 0},{"value": 1},{"value": 1},{"value": 0},{"value": 0},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 0},{"value": 0},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 0},{"value": 0},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 0}]
                if (!datos_opc){
                    console.log("Hubo errores en la consulta OPC. Contacte al administrador.");
                    return res.status(404).send("Hubo errores en la consulta. Contacte al administrador.")
                }
                
                estados=[];
                
                let aux1=""
                switch(datos_opc[3].value){
                    case 0: aux1="NOTLOADED"
                    break;
                    case 1: aux1="LOADED"
                    break;
                    case 2: aux1="ONLINE"
                    break;
                    default: aux1="NaN"
                }

                //Properties del PBLINk---------------------------------------
                pblink_item.push({property: "name", label: "Name", type: "value", value: respPBL.recordset[0].StringValue})
                pblink_item.push({property: "linknum", label: "Numero de Link", type: "value", value: datos_opc[0].value})
                pblink_item.push({property: "fielnetwrktype", label: "Network Type", type: "value", value: datos_opc[1].value})
                pblink_item.push({property: "cpuload", label: "CPU (%)", type: "value", value: datos_opc[2].value})
                pblink_item.push({property: "state", label: "State", type: "icon3", value: aux1})

                slaves_aux.forEach((datos,i) => {
                    //if (i>4){
                        item={
                            DSB_Name: datos.DSB_Name,
                            slave_Num: datos.slave_Num, 
                            slave_Tipo: datos.slave_Tipo,
                            state: datos_opc[i+4].value
                        }
                        slaves.push(item);
                    //}
                })
                console.log(estados)
            }
            catch(error){
                console.log(error);
                 res.status(500).send("Error al levantar los datos por OPC")
            }

            

            const key="PBLINK"+i //respPBL.recordset[0].StringValue //nombre PBLINK
            i=i+1
            var obj = {};
            
            if (!respName_DSB.recordset[0]){
                console.log(respPBL.recordset[0].StringValue, ': No hay DSB asociados')
                obj[key] = {slaves: [], properties: pblink_item}; //si pongo {pblink_item} se escribe tambien pblink_item{datos pblink_item}, como esta ahora se guarda {datos pblink_item}
                pgm.push(obj)
            }
            else{
                obj[key]={slaves: slaves, properties: pblink_item}
                pgm.push(obj)
                
            }
            slaves = [];
            slaves_aux = [];
            pblink_item=[];
        }
        
        opc=[]
        const pblink_name= respPBL.recordset[0].StringValue //nombre PBLINK
        const pgm_status=["bcmstate", "modisredun", "cpufreeavg", "freememink", "ctemp", "pktstxavg", "pktsrxavg", "pdcmsgavg", "cda_averagedisplayparams",
        "BCDSWSTS", "FACTDATAERR", "ROMAPPIMGCHKSMFAIL", "ROMBOOTIMGCHKSMFAIL", "WDTHWFAIL", "WDTSWFAIL", "TASKHLTHMON", "RAMSWEEPERR", "RAMSCRUBERRS", "BACKUPRAMSWEEPERR", "BACKUPRAMSCRUBERRS", "DEBUGFLAGSET", "MINHWREVSF", "PARTNERNOTVISFTE"]
        pgm_status.forEach(datos=>{
            opc.push(device.deviceURLOPC + "/" + device.deviceName + "." + datos)
        })
        //console.log("PGM Status: ", opc)

        //consulta OPC:
        //datos_opc = await getOPC('192.168.53.11', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389',opc)
        //prueba consulta OPC 27 datos:
        /*['System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG',
        'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG',
        'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG',
        'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG',
        'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.RDNROLESTATE','System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CTEMP', 'System Components/WIN-HVFH2TLT9OM/Controllers/C300_BORRAR.CPUFREEAVG']) */
        datos_opc=[{"value":8},{"value":0},{"value":78.85}, {"value":9752}, {"value":37.25}, {"value":60}, {"value":20}, {"value":1640}, {"value":3.67}, {"value": 1}, {"value": 1},
        {"value": 1},{"value": 0},{"value": 1},{"value": 0},{"value": 1},{"value": 0},{"value": 1},{"value": 1},{"value": 1},{"value": 1},{"value": 1},{"value": 0}]
        //console.log(datos_opc)
        
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

        const softfailure=[
            {property:"BCDSWSTS", label: "Device Index Switches Changed", type:"icon",value: datos_opc[9].value},
            {property:"FACTDATAERR", label: "Factory Data Error", type:"icon",value: datos_opc[10].value},
            {property:"ROMAPPIMGCHKSMFAIL", label: "ROM Application Image Checksum Failure", type:"icon",value: datos_opc[11].value},
            {property:"ROMBOOTIMGCHKSMFAIL", label: "ROM Boot Image Checksum Failure", type:"icon",value: datos_opc[12].value},
            {property:"WDTHWFAIL", label: "WDT Hardware Failure", type:"icon",value: datos_opc[13].value},
            {property:"WDTSWFAIL", label: "WDT Refresh Warning", type:"icon",value: datos_opc[14].value},
            {property:"TASKHLTHMON", label: "Critical Task Watchdog Warning", type:"icon",value: datos_opc[15].value},
            {property:"RAMSWEEPERR", label: "Uncorrectable Internal RAM Sweep Error", type:"icon",value: datos_opc[16].value},
            {property:"RAMSCRUBERRS", label: "Corrected Internal RAM Sweep Error", type:"icon",value: datos_opc[17].value},
            {property:"BACKUPRAMSWEEPERR", label: "Uncorrected User RAM Sweep Error", type:"icon",value: datos_opc[18].value},
            {property:"BACKUPRAMSCRUBERRS", label: "Corrected User RAM Sweep Error", type:"icon",value: datos_opc[19].value},
            {property:"DEBUGFLAGSET", label: "Debug Flag Enabled", type:"icon",value: datos_opc[20].value},
            {property:"MINHWREVSF", label: "Minimum HW Revision", type:"icon",value: datos_opc[21].value},
            {property:"PARTNERNOTVISFTE", label: "Partner Not Visible on FTE", type:"icon",value: datos_opc[22].value}
        ]

        const state =
                [{property:"BCMSTATE", label: "Device Index Switches Changed", type:"value",value: aux0},
                {property:"modisredun", label: "Redundancy", type:"icon",value: datos_opc[1].value},
                {property:"cpufreeavg", label: "CPU Free avg", type:"value",value: datos_opc[2].value},
                {property:"freememink", label: "Free Memory", type:"value",value: datos_opc[3].value},
                {property:"ctemp", label: "Current Temperature", type:"value",value: datos_opc[4].value},
                {property:"pktstxavg", label: "pda packet sent avg", type:"value",value: datos_opc[5].value},
                {property:"pktsrxavg", label: "pda packet received avg", type:"value",value: datos_opc[6].value},
                {property:"pdcmsgavg", label: "pdc messages avg", type:"value",value: datos_opc[7].value},
                {property:"cda_averagedisplayparams", label: "CDA Average Display Params", type:"value",value: datos_opc[8].value}
                ]
        //pgm={state}
        //res.json({c300});
        pgm.push({state, softfailure})

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

exports.getDeviceStatus = async (req, res)=>{
    const idDevice = req.params.id
    const device = await Device.findById(idDevice)

    const device_tipo = await DeviceType.findById(device.deviceType)
    //console.log(device_tipo.type)
    switch (device_tipo.type){
        case 'PGM': getPGM(device, res)
            break;
        case 'C300': getC300(device, res)
            break;
        default: res.status(500).send("No se encuentra el tipo de dispositivo")
    }
    //console.log(device.deviceURLOPC, device.deviceIP, device.deviceName)
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

