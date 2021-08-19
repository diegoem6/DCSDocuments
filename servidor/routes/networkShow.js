const express = require('express');
const router = express.Router();
const networkController = require('../controllers/networkController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')
    
    router.get('/',
    auth,
    networkController.createNetworkNodeShowRun) ;

module.exports = router