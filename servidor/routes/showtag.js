const express = require('express');
const router = express.Router();
const tagDescriptorController = require('../controllers/tagDescriptorController')


router.get('/:id',
    tagDescriptorController.getTagDescriptor) ;

module.exports = router

