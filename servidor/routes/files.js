const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.post('/',
    auth,
    fileController.processFile) ;


module.exports = router