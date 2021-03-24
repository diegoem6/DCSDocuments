//Rutas para crear autenticar
const express = require('express');
const router = express.Router();
const authController = require('../controllers/tagDescriptorController')
const auth = require('../middlewares/auth')

// Iniciar sesión
// api/auth
/*router.post('/', 
    authController.authUser
    );
*/
// loguea un usuario
router.get('/:id', 
    //auth,
    authController.getInterlock);

module.exports = router;