const Asset = require('../models/Asset')
const {validationResult} = require('express-validator');


exports.createAsset = async (req, res)=>{
    //valido errores
    const errors = validationResult(req);
        
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const asset = new Asset(req.body);
        asset.save();
        res.send(asset);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error creando el Asset')
    }

}

//obteniendo todos los assets
exports.getAssets = async (req,res)=>{
    try {
        const assets = await Asset.find()
        res.json({assets});
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en obtener assets")
        
    }
}

exports.updateAsset = async (req, res)=>{
    //valido errores
    const errores = validationResult(req);
        
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // extraer la información del asset
    const {name} = req.body
    const newAsset = {};
    if (name){
        newAsset.name=name;
    }

    try {
       
        //revisar el id
        const idAsset = req.params.id

        //existe el Asset?
        let asset_updated = await Asset.findById(idAsset)
        if (!asset_updated){
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset a actualizar")
        }

       
       //actualizar 
       asset_updated = await Asset.findByIdAndUpdate({_id:idAsset},{$set:newAsset},{new:true});
       res.json({asset_updated})


    } catch (error) {
        console.log(error);
        res.status(500).send("Error en actualizar asset")
    }
}

exports.deleteAsset = async (req, res)=>{
    try {
       
        //revisar el id
         const idAsset = req.params.id
        
        //existe el Asset?
         let asset_deleted = await Asset.findById(idAsset)
         if (!asset_deleted){
             console.log("No existe el asset");
             return res.status(404).send("No existe el asset a eliminar")
         }
 
        //actualizar 
        asset_deleted = await Asset.findOneAndRemove({_id:idAsset});
        res.json({msg: 'Asset eliminado'})
 
 
     } catch (error) { 
         console.log(error);
         res.status(500).send("Error en eliminar Asset")
     }
}