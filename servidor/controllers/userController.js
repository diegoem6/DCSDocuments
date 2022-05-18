const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) =>{
    
    //valido errores
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if (user){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }
        
        user = new User(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        

        await user.save();

        // crear y formar el jwt
        const payload = {
            user:{
                id: user.id
            }
        };
        
        // firmar el jwt
        jwt.sign(payload,process.env.CERTIFICADO,{
            expiresIn: 3600
        },(error,token)=>{
            if (error) throw error;

            res.json({token});
        })


    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error en la creación del usuario")
    }
}

exports.getUsers = async (req, res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const users = await User.find().sort({createddate:1})
        
        res.json({users})

    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo obtener los sistemas para este asset"})
        
    }
}

exports.updateUser = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //existe el asset?
        let user_updated = await User.findById(req.body._id)
        if (!user_updated){
            console.log("No existe el user");
            return res.status(404).send({msg:"No existe el user"})
        }
        if (req.user.id.toString() === user_updated._id.toString()){
            console.log("No se puede deshabilitar el usuario con el que estas logueado");
            return res.status(404).send({msg:"No se puede deshabilitar al usuario logueado"})
        }

        const {state} = req.body
        if (state!==null){
            user_updated.state = state
        }
        user_updated = await User.findOneAndUpdate({_id:user_updated._id},user_updated,{new:true});
        res.json({user_updated})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"Error actualizando el sistema"})
        
    }
}


exports.deleteUser = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const {idUser} = req.query;
        //existe el user?
        const user_deleted = await User.findById(idUser)
        if (!user_deleted){
            console.log("No existe el usuario");
            return res.status(404).send("No existe el usuario")
        }

        //eliminando sistemas
        await User.findOneAndRemove({_id:user_deleted._id});
        res.json({msg:"Usuario eliminado"})


    } catch ({error}) {
        console.log(error);
        res.status(500).send({msg:"No se pudo eliminar el sistema, contacte a un administrador"})
        
    }
}