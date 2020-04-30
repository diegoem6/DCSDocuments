//Rutas para crear autenticar
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

// Iniciar sesión
// api/auth
router.post('/', 
    authController.authUser
    );

// loguea un usuario
router.get('/', 
    auth,
    authController.getUser);

module.exports = router;