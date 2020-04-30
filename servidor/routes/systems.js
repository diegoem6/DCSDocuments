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


// router.put('/:id',
//     auth,
//     systemController.actualizarTarea) ;

// router.delete('/:id',
//     auth,
//     systemController.eliminarTarea) ;
    
module.exports = router