const express = require('express');
const { getTopUpHistoryByUserId, createTopUpHistory, deleteTopUpHistory } = require('../controllers/topUpHistory');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getTopUpHistoryByUserId);
router.post('/', auth, createTopUpHistory);
router.delete('/', auth, deleteTopUpHistory);

module.exports = router;
