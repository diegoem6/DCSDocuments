const Asset = require('../models/Asset')
const System = require('../models/System')
const {validationResult} = require('express-validator');


exports.getTree = async (req, res)=>{
    //valido errores
    const errors = validationResult(req);
        
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
       
        const assets = await Asset.aggregate([{$lookup:{
                from:'systems',
                localField: '_id',
                foreignField: 'asset',
                as: 'nodes'
        }}])
        
        res.json({assets});
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en obtener assets")
        
    }
}
