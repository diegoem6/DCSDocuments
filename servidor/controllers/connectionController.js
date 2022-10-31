const Connection = require('../models/Connection');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createConnection = async (req, res) =>{
    
    //valido errores
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {source, target } = req.body;
    
    try {
        let connection = await Connection.findOne(
            {
                $and: [
                       { source : source },
                       { target : target },
                     ]
            }
        );
        if (connection !== null){
            console.log("error")
            return res.status(500).send("La conexion ya existe");
        }
        connection = new Connection(req.body);
        await connection.save();
        res.json({connection})

    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error en la creación de la conexión")
    }
}

exports.getConnections = async (req, res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const connections = await Connection.find().sort({createddate:1})
        
        res.json({connections})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener las conexiones"})
        
    }
}

exports.deleteConnection = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //existe el user?
        const connection_deleted = await Connection.findById(req.params.id)
        if (!connection_deleted){
            console.log("No existe la conexión");
            return res.status(404).send("No existe la conexión")
        }

        //eliminando sistemas
        await Connection.findOneAndRemove({_id:connection_deleted._id});
        res.json({msg:"Conexión eliminada"})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar la conexión, contacte a un administrador"})
        
    }
}