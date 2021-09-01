const System = require('../models/System')
const Asset = require('../models/Asset')
const TagDescriptor = require('../models/TagDescriptor')
const {validationResult} = require('express-validator');
const NetworkNode = require('../models/NetworkNode');
const NetworkModel = require ('../models/NetworkNodeModel')
const {getSNMP,getSNPM_Sync, connectTelnetShow, connectTelnetShowTech} = require ('./commController');
const NetworkNodeModel = require('../models/NetworkNodeModel');

exports.addNetworkNode = async (req,res)=>{
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


        const new_networkNode = new NetworkNode(req.body);
        await new_networkNode.save()

        res.json({new_networkNode})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo crear el nodo de red, contacte a un administrador"})
        
    }
}

exports.updateNetworkNode = async (req,res)=>{
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

        let networkNodeUpdated = await NetworkNode.findById(req.params.id)
        if (!networkNodeUpdated){
            console.log("No existe el sistema");
            return res.status(404).send({msg:"No existe el nodo de red"})
        }

        const {nodeName, nodeDescription, nodeModel, nodeIP} = req.body
        if (nodeName!==null){
            //networkNodeUpdated.name = nodeName
            networkNodeUpdated.nodeName = nodeName
        }
        if (nodeDescription!==null){
            networkNodeUpdated.nodeDescription = nodeDescription
        }
        if (nodeModel!==null){
            networkNodeUpdated.nodeModel = nodeModel
        }
        if (nodeIP!==null){
            networkNodeUpdated.nodeIP = nodeIP
        }
        //db.collection.findOneAndUpdate( filter, update, options )
        networkNodeUpdated = await NetworkNode.findOneAndUpdate({_id:req.params.id},networkNodeUpdated,{new:true});
        res.json({networkNodeUpdated})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"Error actualizando el nodo de red"})
        
    }
}


exports.getNetworkNodes = async (req,res)=>{
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

        const networkNodes = await NetworkNode.find({asset:asset_updated._id}).sort({creado:-1})
        res.json({networkNodes})
        //console.log(networkNodes)

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los nodos de red para este asset"})
        
    }
}

exports.getNetworkNodeModels = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const networkNodeModels = await NetworkModel.find()
        res.json({networkNodeModels})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los modelos de los nodos"})
        
    }
}

exports.getNetworkModelByID = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idModelo = req.params.id
        const networkModel_get = await NetworkModel.findById(idModelo)
        
        if (!networkModel_get){
            console.log("No existe el modelo del nodo de red");
            return res.status(404).send("No existe el modelo del nodo de red")
        }
        
        //envío el modelo del nodo
        res.json({networkModel_get})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo procesar el modelo del nodo de red, contacte a un administrador"})
        
    }
}

exports.getNetworkNode = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idNodo = req.params.id
        //console.log('El ID es: ',idNodo)
        const network_node = await NetworkNode.findById(idNodo)
        const network_model = await NetworkNodeModel.findById(network_node.nodeModel)
        
        if (!network_node){
            console.log("No existe el nodo de red");
            return res.status(404).send("No existe el nodo de red")
        }
       
        let network_get = network_node.toObject()
        network_get.status = []
        let item = {
            interface: "",
            description: "",
            state: "",
            vlan: "",
            speed: "",
            duplex: "full-duplex",
            type: "1000BaseTX"
        }
        let oid_name;
        let oid_desc;
        let oid_state;
        let oid_speed;
        let oid_vlan;
        let oid_duplex;
        let x = 1
        while (x<=network_model.port_fast){
            if (x > 9){
                oid_name="1.3.6.1.2.1.31.1.1.1.1.100" + x
                oid_desc="1.3.6.1.2.1.31.1.1.1.18.100" + x
                oid_state="1.3.6.1.2.1.2.2.1.8.100" + x
                oid_speed="1.3.6.1.2.1.2.2.1.5.100" + x
                oid_vlan="1.3.6.1.4.1.9.9.68.1.2.2.1.2.100" + x
                oid_alias="1.3.6.1.2.1.31.1.1.1.18.100" + x
                oid_duplex="1.3.6.1.2.1.10.7.2.1.19.100" + x
            }else{
                oid_name="1.3.6.1.2.1.31.1.1.1.1.1000"  + x
                oid_desc="1.3.6.1.2.1.31.1.1.1.18.1000" + x
                oid_state="1.3.6.1.2.1.2.2.1.8.1000" + x
                oid_speed="1.3.6.1.2.1.2.2.1.5.1000" + x
                oid_vlan="1.3.6.1.4.1.9.9.68.1.2.2.1.2.1000" + x
                oid_alias="1.3.6.1.2.1.31.1.1.1.18.1000" + x
                oid_duplex="1.3.6.1.2.1.10.7.2.1.19.1000" + x
            }
            
            item.interface = await getSNPM_Sync(network_get.nodeIP,"public",[oid_name])
            item.description = await getSNPM_Sync(network_get.nodeIP,"public",[oid_desc])
            item.state = await getSNPM_Sync(network_get.nodeIP,"public",[oid_state])
            item.state === "1" ? item.state = "up" : item.state = "down"
            item.speed = await getSNPM_Sync(network_get.nodeIP,"public",[oid_speed])
            item.speed = parseInt(item.speed)/1000000

            item.vlan = await getSNPM_Sync(network_get.nodeIP,"public",[oid_vlan])
            item.duplex = await getSNPM_Sync(network_get.nodeIP,"public",[oid_duplex])

            x+=1
            network_get.status.push(item);
            item = {
                interface: "",
                description: "",
                state: "",
                vlan: "",
                speed: "",
                duplex: ""
            }
            
        }
        
        x = 1
        while (x<=network_model.port_giga){
            if (x > 9){
                oid_name="1.3.6.1.2.1.31.1.1.1.1.101" + x
                oid_desc="1.3.6.1.2.1.31.1.1.1.18.101" + x
                oid_state="1.3.6.1.2.1.2.2.1.8.101" + x
                oid_speed="1.3.6.1.2.1.2.2.1.5.101" + x
                oid_vlan="1.3.6.1.4.1.9.9.68.1.2.2.1.2.101" + x
                oid_alias="1.3.6.1.2.1.31.1.1.1.18.101" + x
                oid_duplex="1.3.6.1.2.1.10.7.2.1.19.101" + x
            }else{
                oid_name="1.3.6.1.2.1.31.1.1.1.1.1010"  + x
                oid_desc="1.3.6.1.2.1.31.1.1.1.18.1010" + x
                oid_state="1.3.6.1.2.1.2.2.1.8.1010" + x
                oid_speed="1.3.6.1.2.1.2.2.1.5.1010" + x
                oid_vlan="1.3.6.1.4.1.9.9.68.1.2.2.1.2.1010" + x
                oid_alias="1.3.6.1.2.1.31.1.1.1.18.1010" + x
                oid_duplex="1.3.6.1.2.1.10.7.2.1.19.1010" + x
            }

            item.interface = await getSNPM_Sync(network_get.nodeIP,"public",[oid_name])
            item.description = await getSNPM_Sync(network_get.nodeIP,"public",[oid_desc])
            item.state = await getSNPM_Sync(network_get.nodeIP,"public",[oid_state])
            item.state === "1" ? item.state = "up" : item.state = "down"
            item.speed = await getSNPM_Sync(network_get.nodeIP,"public",[oid_speed])
            item.speed = parseInt(item.speed)/1000000

            item.vlan = await getSNPM_Sync(network_get.nodeIP,"public",[oid_vlan])
            item.duplex = await getSNPM_Sync(network_get.nodeIP,"public",[oid_duplex])
            
            x+=1
            network_get.status.push(item);
            item = {
                interface: "",
                description: "",
                state: "",
                vlan: "",
                speed: "",
                duplex: ""
            }
        }

        res.json({network_get})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el nodo de red, contacte a un administrador"})
        
    }
}





exports.deleteNetworkNode = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //revisar el id
        const idNodo = req.params.id
        const network_deleted = await NetworkNode.findById(idNodo)
        if (!network_deleted){
            console.log("No existe el nodo de red");
            return res.status(404).send("No existe el nodo de red")
        }
        
        //eliminando nodos
        await NetworkNode.findOneAndRemove({_id:req.params.id});
        res.json({msg:"Nodo de red eliminado"})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el nodo de red, contacte a un administrador"})
        
    }
}

exports.createNetworkNodeShowRun = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const {data} = req.query
        const {ip, tipo} = JSON.parse(data)
        
        const hostname = await getSNPM_Sync(ip,"public",['1.3.6.1.2.1.1.5.0'])
        if (!hostname){
            console.log("No existe el nodo de red solicitado");
            return res.status(404).send("No existe el nodo de red solicitado")
        }

        let show_run = await connectTelnetShow(hostname, ip, tipo) //aca guardo el archivo, ver como aviso con urlDoc
        show_run = `${hostname}-show_${tipo}.txt`
        res.json({filename:show_run})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el nodo de red, contacte a un administrador"})
        
    }

}