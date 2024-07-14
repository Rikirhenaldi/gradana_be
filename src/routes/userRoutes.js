const express = require('express');
const { getUserData } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getUserData);

module.exports = router;
