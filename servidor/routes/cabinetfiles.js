const express = require('express');
const router = express.Router();
const fileCabController = require('../controllers/fileCabinetController')
const auth = require('../middlewares/auth')
const { check } = require('express-validator')

router.post('/:id',
    auth,
    fileCabController.uploadFile);

// router.get('/',
//     roomController.getRooms) ;


// router.put('/:id',
//      roomController.updateRoom) ;

router.delete('/:id',
    fileCabController.deleteFile);

module.exports = router