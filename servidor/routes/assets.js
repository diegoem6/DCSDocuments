const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.post('/',
    auth,
    [
        check('name','El nombre del Asset no puede estar vacío').not().isEmpty()
    ],
    assetController.createAsset) ;

router.get('/',
    auth,
    assetController.getAssets) ;


router.put('/:id',
     auth,
     assetController.updateAsset) ;

router.delete('/:id',
    auth,
    assetController.deleteAsset) ;
    
module.exports = router