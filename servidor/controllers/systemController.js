const System = require('../models/System')
const Asset = require('../models/Asset')
const TagDescriptor = require('../models/TagDescriptor')
const {validationResult} = require('express-validator');


exports.addSystem = async (req,res)=>{
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


        const new_systems = new System(req.body);
        await new_systems.save()

        res.json({new_systems})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo crear el sistema, contacte a un administrador"})
        
    }
}

exports.updateSystem = async (req,res)=>{
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

        let systems_updated = await System.findById(req.params.id)
        if (!systems_updated){
            console.log("No existe el sistema");
            return res.status(404).send({msg:"No existe la sistema"})
        }

        const {name, active} = req.body
        if (name!==null){
            systems_updated.name = name
        }
        if (active!==null){
            systems_updated.active = active
        }


        systems_updated = await System.findOneAndUpdate({_id:req.params.id},systems_updated,{new:true});
        res.json({systems_updated})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"Error actualizando el sistema"})
        
    }
}


exports.getSystems = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const {asset} = req.query;
        //existe el asset?
        const asset_updated = await Asset.findById(asset)
        if (!asset_updated){
            console.log("No existe el asset");
            return res.status(404).send({res:"No existe el asset"})
        }

        const systems = await System.find({asset:asset_updated._id}).sort({creado:-1})
        res.json({systems})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los sistemas para este asset"})
        
    }
}
exports.getSystemAndAssetById= async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
       
        const {idSystem} = req.query;
        const system = await System.findById(idSystem)
       
      
        if(!system){
            console.log("No existe el system");
            return res.status(404).send({res:"No existe el system"})
        }
        
        //existe el asset?
        const asset = await Asset.findById(system.asset)
       
        if (!asset){
            console.log("No existe el asset");
            return res.status(404).send({res:"No existe el asset"})
        }

      const resp = {
        systemName : system.name,
        assetName : asset.name
    }
        res.json({resp})
        

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los sistemas para este asset"})
        
    }
}
exports.deleteSystems = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const {idAsset} = req.query;
        //existe el asset?
        const asset_updated = await Asset.findById(idAsset)
        if (!asset_updated){
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset")
        }

        //eliminadno tags descriptors
        const tagdescriptors = await TagDescriptor.find({system:req.params.id})
        tagdescriptors.forEach(async tg => {
            await TagDescriptor.findOneAndRemove({_id:tg._id})
        });

        //eliminando sistemas
        await System.findOneAndRemove({_id:req.params.id});
        res.json({msg:"Sistema eliminado"})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el sistema, contacte a un administrador"})
        
    }
}