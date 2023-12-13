const express = require('express');
const router = express.Router();
const iocardController = require('../controllers/iocardController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.post('/',
    //auth,
    [
        check('tagname','El tagname de la iocard no puede estar vacío').not().isEmpty(),
        check('type','El tipo de la iocard no puede estar vacío').not().isEmpty(),
        check('iolink','El iolink debe ser 1 o 2').isNumeric(),
        check('deviceIndex','El deviceIndex de la iocard no puede estar vacío').not().isEmpty(),
        check('deviceIndex','El deviceIndex debe ser un número').isNumeric(),
        //check('redundant','La redundancia de la iocard no puede estar vacío').not().isEmpty(),
        check('cabinet','El gabinete donde se encuentra la iocard no puede estar vacío').not().isEmpty(),
        check('location','El formato de la ubicacion debe ser, por ej:  MB-10').not().isEmpty(),
        check('location','El formato de la ubicacion debe ser, por ej:  MB-10').contains("-"), //tiene que contener el "-"
        check('location','El formato de la ubicacion debe ser, por ej: MB-10').isLength({min:4, max:5}), //tiene que contener el "-"
        check('controllerA','El controlador A no puede estar vacío').not().isEmpty(),
        check('asset','El asset no puede estar vacío').not().isEmpty()
    ],
    iocardController.addIOCard) ;


    router.get('/',
    //auth,
    iocardController.getIOCards) ;

router.get('/all',
    //auth,
    iocardController.getIOCardsAll) ;

router.get('/iocardcontrollerssinB/',
    iocardController.getIOCardControllers_sinB);


router.put('/:id',
    //auth,
    [
        check('tagname','El tagname de la iocard no puede estar vacío').not().isEmpty(),
        check('type','El tipo de la iocard no puede estar vacío').not().isEmpty(),
        check('iolink','El iolink debe ser 1 o 2').isNumeric(),
        check('deviceIndex','El deviceIndex de la iocard no puede estar vacío').not().isEmpty(),
        check('deviceIndex','El deviceIndex debe ser un número').isNumeric(),
        //check('redundant','La redundancia de la iocard no puede estar vacío').not().isEmpty(),
        check('cabinet','El gabinete donde se encuentra la iocard no puede estar vacío').not().isEmpty(),
        check('location','El formato de la ubicacion debe ser, por ej:  MB-10').not().isEmpty(),
        check('location','El formato de la ubicacion debe ser, por ej:  MB-10').contains("-"), //tiene que contener el "-"
        check('location','El formato de la ubicacion debe ser, por ej: MB-10').isLength({min:4, max:5}), //tiene que contener el "-"
        check('controllerA','El controlador A no puede estar vacío').not().isEmpty(),
        check('asset','El asset no puede estar vacío').not().isEmpty()
    ],
    iocardController.updateIOCard) ;

router.delete('/:id',
    //auth,
    iocardController.deleteIOCard) ;

router.get('/iocardstypes',
    iocardController.getIOCardTypesAll);

router.get('/iocardcontrollers',
    iocardController.getIOCardControllersAll);

router.get('/iocardcabinets',
    iocardController.getIOCardCabinetsAll);

router.get('/:id',
//    auth,
    iocardController.getIOCard) ;

router.get('/cabinet/:id',
    //auth,
    iocardController.getIOCardsCabinets) ;

router.get('/prueba/:id',
    iocardController.getIOCardType);

router.get('/iocardsA/:id',
    iocardController.getIOCardsControllerA);

router.get('/iocardsB/:id',
    iocardController.getIOCardsControllerB);



module.exports = router