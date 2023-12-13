const express = require('express');
const router = express.Router();
const tagDescriptorController = require('../controllers/tagDescriptorController')
const auth = require('../middlewares/auth')
const {check} = require('express-validator')

router.post('/',
    auth,
    [
        check('tagname','El tagname no puede estar vacío').not().isEmpty()
    ],
    tagDescriptorController.createTagDescriptor) ;

router.get('/',
    auth,
    tagDescriptorController.getTagsDescriptors) ;
    router.get('/all',
    auth,
    tagDescriptorController.getAllTagsDescriptors) ;

router.get('/related/:id',
    auth,
    tagDescriptorController.getTagsDescriptors_Related) ;
router.put('/:id',
    auth,
    tagDescriptorController.updateTagDescriptor)

router.delete('/:id',
    auth,
    tagDescriptorController.deleteTagDescriptor)
    
module.exports = router