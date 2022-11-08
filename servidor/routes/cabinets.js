const express = require('express');
const router = express.Router();
const cabinetController = require('../controllers/cabinetController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

router.post('/',
    auth,
    [
        check('cabinetName', 'El nombre del gabinete no puede estar vacío').not().isEmpty(),
        check('cabinetDescription', 'La descripción del gabinete no puede estar vacía').not().isEmpty(),
        check('cabinetLatitude', 'La latitud del gabinete no puede estar vacía').not().isEmpty(),
        check('cabinetLongitude', 'La longitud del gabinete no puede estar vacía').not().isEmpty(),
        check('cabinetSize', 'El tamaño del gabinete no puede estar vacío').not().isEmpty(),
        check('area', 'El area del gabinete no puede estar vacía').not().isEmpty()
    ],
    cabinetController.addCabinet);

router.get('/cabinetname/:cabinetname',
    //auth,
    cabinetController.getCabinetbyName);

router.get('/',
    auth,
    cabinetController.getCabinets);
router.get('/:id',
    //auth,
    cabinetController.getCabinet);
router.put('/:id',
    auth,
    cabinetController.updateCabinet);

router.delete('/:id',
    auth,
    cabinetController.deleteCabinet);

module.exports = router;
