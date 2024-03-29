const express = require('express');
const router = express.Router();
const networkController = require('../controllers/networkController')
const deviceController = require('../controllers/deviceController')
const auth = require('../middlewares/auth')
/*
router.post('/',
    auth,
    [
        check('nodeName','El nombre del nodo no puede estar vacío').not().isEmpty(),
        check('asset','El asset no puede estar vacío').not().isEmpty()
    ],
    networkController.addNetworkNode) ;
*/
router.get('/getArchitectureNodes/',
    auth,
    networkController.getArchitectureNodes) ;

router.get('/getArchitectureDevices/',
    auth,
    networkController.getArchitectureDevices) ;

router.get('/getNetworkNodeID/',
    auth,
    networkController.getNetworkNodeID) ;
    
router.get('/getDeviceID/',
    auth,
    deviceController.getDeviceID) ;
    
/*
router.put('/:id',
    auth,
    networkController.updateNetworkNode) ;

router.delete('/:id',
    auth,
    networkController.deleteNetworkNode) ;
*/    
module.exports = router
