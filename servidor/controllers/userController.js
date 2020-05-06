const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

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
        
        if(email.split("@")[1] !== "montesdelplata.com.uy" ){
            return res.status(400).json({msg: 'El email no pertenece a montes del plata'})
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