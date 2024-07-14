const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('Balance', BalanceSchema);
