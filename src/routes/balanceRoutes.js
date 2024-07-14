const express = require('express');
const { getUserBalance, createUserBalance, updateUserBalance, deleteUserBalance } = require('../controllers/balanceController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getUserBalance);
router.post('/', auth, createUserBalance);
router.put('/', auth, updateUserBalance);
router.delete('/', auth, deleteUserBalance);

module.exports = router;
