const System = require('../models/System')
const Asset = require('../models/Asset')
const TagDescriptor = require('../models/TagDescriptor')
const {validationResult} = require('express-validator');
const NetworkNode = require('../models/NetworkNode');
const NetworkModel = require ('../models/NetworkNodeModel')

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
        //console.log(idModelo)
        //console.log('El ID es: ',idNodo)
        const networkModel_get = await NetworkModel.findById(idModelo)
        //console.log('El nodo es: ',networkModel_get)
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
        //console.log('El nodo es: ',network_get)
        if (!network_node){
            console.log("No existe el nodo de red");
            return res.status(404).send("No existe el nodo de red")
        }
        // aca va la consulta telnet
        let network_get = network_node.toObject()
        network_get.status = 
        
            [
                {
                    interface: "GigabitEthernet1/0/1",
                    description: "FTE Community Crossover",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/2",
                    description: "UPLINK - PMSWSY011A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/3",
                    description: "UPLINK - PMSWSY021A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/4",
                    description: "UPLINK - PMSWSY031A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/5",
                    description: "UPLINK - PMSWSY111A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/6",
                    description: "UPLINK - PMSWSY211A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/7",
                    description: "UPLINK - PMSWSY121A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/8",
                    description: "UPLINK - PMSWSY221A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/9",
                    description: "UPLINK - PMSWSY251A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/10",
                    description: "UPLINK - PMSWSY402A",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/11",
                    description: "UPLINK - Spare",
                    state: "down",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                },
                {
                    interface: "GigabitEthernet1/0/12",
                    description: "PIMS Firewall",
                    state: "up",
                    vlan: "6",
                    speed: "1000",
                    duplex: "full-duplex",
                    type: "1000BaseTX"
                }
            ]
        
        
        //envío el nodo
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