const express = require('express');
const router = express.Router();
const networkController = require('../controllers/networkController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')
/*
router.post('/',
    auth,
    [
        check('nodeName','El nombre del nodo no puede estar vacío').not().isEmpty(),
        check('asset','El asset no puede estar vacío').not().isEmpty()
    ],
    networkController.addNetworkNode) ;
*/
router.get('/',
    auth,
    networkController.getNetworkNodeModels) ;
/*
router.get('/:id',
    auth,
    networkController.getNetworkNode) ;

router.put('/:id',
    auth,
    networkController.updateNetworkNode) ;

router.delete('/:id',
    auth,
    networkController.deleteNetworkNode) ;
*/    
module.exports = router