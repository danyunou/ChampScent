const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

router.post('/registrar', ctrl.registrar);
router.post('/login', ctrl.login);
router.post('/recuperar', ctrl.recuperar);

module.exports = router;
