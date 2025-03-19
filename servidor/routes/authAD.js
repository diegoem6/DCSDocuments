const express = require('express');
const router = express.Router();
const { authenticateAD } = require('../middlewares/authAD');
const jwt = require('jsonwebtoken');
const ad = require('../config/activeDirectory');
require('dotenv').config({ path: 'variables.env' });

// Endpoint para probar la conexión al AD
router.get('/test-connection', (req, res) => {
    console.log('Intentando conectar al AD con las siguientes credenciales:');
    console.log('URL:', process.env.AD_URL);
    console.log('Base DN:', process.env.AD_BASE_DN);
    console.log('Username:', process.env.AD_USERNAME);

    ad.findUser(process.env.AD_USERNAME, (err, user) => {
        if (err) {
            //console.error('Error detallado de conexión AD:', err);
            return res.status(500).json({
                ok: false,
                msg: 'Error de conexión al Active Directory',
                error: err.message,
                details: err
            });
        }

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado en el Active Directory'
            });
        } 

        //console.log('Usuario encontrado:', user);
        res.json({
            ok: true,
            msg: 'Conexión exitosa al Active Directory',
            user: {
                username: user.sAMAccountName,
                email: user.mail,
                name: user.displayName
            }
        });
    });
});
// Endpoint para obtener todos los usuarios del AD
router.get('/users', (req, res) => {
    const query = {
        filter: '(&(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))',
        scope: 'sub',
        attributes: ['sAMAccountName', 'mail', 'displayName', 'memberOf']
    };

    ad.find(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios del AD:', err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al obtener usuarios del Active Directory',
                error: err.message
            });
        }

        if (!results || !results.users) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron usuarios'
            });
        }

        const users = results.users.map(user => ({
            username: user.sAMAccountName,
            email: user.mail,
            name: user.displayName,
            groups: user.memberOf
        }));

        res.json({
            ok: true,
            users
        });
    });
});

router.post('/login', authenticateAD, (req, res) => {
    const user = req.user;
    
    // Crear el token JWT
    const token = jwt.sign(
        {
            uid: user.sAMAccountName,
            email: user.mail,
            name: user.displayName,
            groups: user.memberOf
        },
        process.env.CERTIFICADO,
        { expiresIn: process.env.TIMEOUTUSUARIO }
    );

    res.json({
        ok: true,
        user: {
            uid: user.sAMAccountName,
            email: user.mail,
            name: user.displayName,
            groups: user.memberOf
        },
        token
    });
});

module.exports = router; 