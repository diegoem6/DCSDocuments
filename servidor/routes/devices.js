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

router.get('/all',
    auth,
    deviceController.getDevicesAll) ;

router.get('/:id',
    auth,
    deviceController.getDevice) ;



router.put('/:id',
    auth,
    deviceController.updateDevice) ;

router.delete('/:id',
    auth,
    deviceController.deleteDevice) ;

//router.get('/device/:id',
//    auth,
    //deviceController.getDeviceStatus) ;
 
router.get('/status/:id',
    //auth,
    deviceController.getDeviceStatus) ; //no olvidar indicar de que servidor se hacen las consultas SQL, por ahora son del mio local

/*
router.get('/pgm/:id',
    //auth,
    deviceController.getPGM) ; //no olvidar indicar de que servidor se hacen las consultas SQL, por ahora son del mio local

router.get('/c300/:id',
    //auth,
    deviceController.getC300) ;
*/

//router.get('/opc/:ip',
//    deviceController.getOPCItems)

module.exports = router