const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const validateResult = require('../validators/validateResult');

const router = express.Router();

router.post('/register', registerValidation, validateResult, register);
router.post('/login', loginValidation, validateResult, login);

module.exports = router;
