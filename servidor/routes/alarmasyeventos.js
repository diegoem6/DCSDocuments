//Rutas para crear autenticar
const express = require('express');
const router = express.Router();
const tagDescriptorController = require('../controllers/tagDescriptorController')
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
    tagDescriptorController.getAlarmasyEventos);

module.exports = router;