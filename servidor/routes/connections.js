//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const auth = require('../middlewares/auth');
const {check} = require ('express-validator');

// crea un usuario 
// api/usuarios
router.post('/', 
connectionController.createConnection);

router.get('/',
    auth,
    connectionController.getConnections) ;

router.delete('/:id',
    auth,
    connectionController.deleteConnection) ;

module.exports = router;