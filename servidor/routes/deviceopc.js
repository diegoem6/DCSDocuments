const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController')
const commController = require('../controllers/commController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')
    
    router.get('/',
    auth,
    //commController.getOPC
    deviceController.getOPCItem) ;

module.exports = router