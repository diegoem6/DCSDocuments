const System = require('../models/System')
const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');


exports.addSystem = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        //existe el proyecto?
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
        res.status(500).send("Error creando el systems")
        
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
            return res.status(404).send("No existe el asset")
        }

        const systems = await System.find({asset:asset_updated._id}).sort({creado:-1})
        
        res.json({systems})


    } catch ({error}) {
        console.log(error);
        res.status(500).send("Error obteniendo los systems")
        
    }
}