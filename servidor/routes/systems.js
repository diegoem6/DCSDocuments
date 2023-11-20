const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.post('/',
    auth,
    [
        check('name','El nombre del system no puede estar vacío').not().isEmpty(),
        check('asset','El asset no puede estar vacío').not().isEmpty()
    ],
    systemController.addSystem) ;

router.get('/',
    auth,
    systemController.getSystems) ;
    router.get('/:id',
    auth,
    systemController.getSystemAndAssetById) ;
router.put('/:id',
    auth,
    systemController.updateSystem) ;

router.delete('/:id',
    auth,
    systemController.deleteSystems) ;
    
module.exports = router