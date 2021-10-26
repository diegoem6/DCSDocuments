const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.post('/',
    auth,
    [
        check('deviceName','El nombre del dispositivo no puede estar vacío').not().isEmpty(),
        check('asset','El asset no puede estar vacío').not().isEmpty()
    ],
    deviceController.addDevice) ;

router.get('/',
    auth,
    deviceController.getDevices) ;

router.get('/:id',
    auth,
    deviceController.getDevice) ;

router.put('/:id',
    auth,
    deviceController.updateDevice) ;

router.delete('/:id',
    auth,
    deviceController.deleteDevice) ;



module.exports = router