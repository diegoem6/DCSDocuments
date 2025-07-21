const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/auth');
router.post(
  '/',
  [
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('datasource', 'El datasource es obligatorio').not().isEmpty(),
    check('query', 'La consulta es obligatoria').not().isEmpty()
  ],
  reportController.addReport
);

router.put(
  '/:id',
  [
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('datasource', 'El datasource es obligatorio').not().isEmpty(),
    check('query', 'La consulta es obligatoria').not().isEmpty()
  ],
  reportController.updateReport
);

router.get('/', reportController.getReports);


router.get('/:id', reportController.getReport);


router.delete('/:id', reportController.deleteReport);

module.exports = router;
