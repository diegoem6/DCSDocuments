const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) =>{
    //valido errores
   // console.log("Datos recibidos authUser:", req.body);
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //console.log("Datos recibidos authUser:", req.body);
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email: email});

        if (!user){
            return res.status(400).send({msg:'No existe el usuario registrado'})
        }

        if (user.state === "INACTIVE"){
            return res.status(400).send({msg:'El usuario no está activo'})
        }
        
        const passwordOk = await bcryptjs.compare(password,user.password)

        if (!passwordOk){
            return res.status(400).send({msg:'Contraseña incorrecta'})
        }

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
        res.status(500).send({msg:'Error en el servidor'});
    }
}

exports.getUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en el servidor")
    }
}