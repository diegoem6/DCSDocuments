const ad = require('../config/activeDirectory');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Primero autenticar contra AD
        await new Promise((resolve, reject) => {
            ad.authenticate(email, password, (err, auth) => {
                if (err) {
                    console.log('Error en AD:', err);
                    reject(new Error('Error en la autenticación de AD'));
                }
                
                if (auth) {
                    resolve(true);
                } else {
                    reject(new Error('Credenciales AD incorrectas'));
                }
            });
        });
 
        // Si la autenticación AD es exitosa, buscar o crear usuario local
        let usuario = await User.findOne({ email });
        
        if (!usuario) {
            // Obtener información del usuario desde AD
            const adUser = await new Promise((resolve, reject) => {
                ad.findUser(email, (err, user) => {
                    if (err) {
                        reject(err);
                    }
                    if (!user) {
                        reject(new Error('Usuario no encontrado en AD'));
                    }
                    resolve(user);
                });
            });

            // Crear usuario local con datos de AD
            usuario = await User.create({
                email,
                name: adUser.displayName || email,
                password: 'AD_AUTH', // No almacenamos la contraseña real
                rol: 'USER', // Rol por defecto
                state: 'ACTIVE'
            });
        } else if (usuario.state === 'INACTIVE') {
            throw new Error('Usuario inactivo');
        }

        // Generar JWT
        const token = jwt.sign({
            id: usuario._id,
            name: usuario.name,
            email: usuario.email,
            rol: usuario.rol
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        res.json({ token });

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: error.message || 'Error de autenticación' });
    }
};

// Función para obtener usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await User.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
};