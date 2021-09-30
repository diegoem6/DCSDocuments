const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.get('/',
    auth,
    deviceController.getDeviceTypes) ;

router.get('/:id',
    auth,
    deviceController.getDeviceTypesByID) ;
/*
router.put('/:id',
    auth,
    networkController.updateNetworkNode) ;

router.delete('/:id',
    auth,
    networkController.deleteNetworkNode) ;
*/    
module.exports = router