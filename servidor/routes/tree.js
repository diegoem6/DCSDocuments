const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')


router.get('/',
    auth,
    treeController.getTree) ;

module.exports = router
