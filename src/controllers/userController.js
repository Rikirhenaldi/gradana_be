const User = require('../models/User');
const Balance = require('../models/Balance');
const TopUpHistory = require('../models/TopUpHistory');
const { successResponse, errorResponse } = require('../utils/response');

exports.getUserData = async (req, res) => {
  try {
    const userId = req?.authUser?.user?.id;

    // Ambil informasi user dari tabel Users
    const user = await User.findById(userId).select('name email phone');

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Ambil saldo dari tabel Balance
    const balance = await Balance.findOne({ user: userId });

    // Ambil riwayat top-up dari tabel TopUpHistory, diurutkan berdasarkan tanggal descending
    const topUpHistory = await TopUpHistory.find({ user: userId }).sort({ date: -1 });

    successResponse(res, { user, balance, topUpHistory }, 'User data retrieved successfully');
  } catch (err) {
    console.error('Error fetching user data:', err);
    errorResponse(res, 500, 'Server error');
  }
};
