//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const {check} = require ('express-validator');

// crea un usuario 
// api/usuarios
router.post('/', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El mail no es válido').isEmail(),
        check('password', 'La contraseña tiene que tener al menos 6 caracteres').isLength({min:6})
    ],
    userController.createUser);
router.get('/',
    auth,
    userController.getUsers) ;

router.put('/changeState/:id',
    auth,
    userController.updateUser) ;

router.put('/changePassword/',
    auth,
    userController.changePassword) ;

router.delete('/:id',
    auth,
    userController.deleteUser) ;

module.exports = router;