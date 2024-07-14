// Import model dan utilitas yang diperlukan
const TopUpHistory = require('../models/TopUpHistory');
const { successResponse, errorResponse } = require('../utils/response');

// Fungsi controller untuk membuat riwayat top-up baru
exports.createTopUpHistory = async (req, res) => {
  const { amount } = req.body;
  const userId = req?.authUser?.user?.id; // Mengambil userId dari token JWT

  try {
    // Simpan riwayat top-up ke dalam database
    const topUp = new TopUpHistory({
      user: userId,
      amount: amount,
      createdAt: new Date(), // Atau gunakan tanggal yang disediakan dari permintaan
    });

    await topUp.save();

    // Berikan respons sukses
    successResponse(res, topUp, 'Top-up history created successfully');
  } catch (error) {
    console.error('Error creating top-up history:', error);
    // Berikan respons error jika terjadi kesalahan
    errorResponse(res, 500, 'Failed to create top-up history');
  }
};

// Fungsi controller untuk membaca riwayat top-up berdasarkan ID pengguna
exports.getTopUpHistoryByUserId = async (req, res) => {
    const userId = req?.authUser?.user?.id; // Mengambil userId dari token JWT
  
    try {
      // Temukan riwayat top-up berdasarkan ID pengguna
      const topUpHistories = await TopUpHistory.find({ user: userId });
  
      // Berikan respons sukses dengan data riwayat top-up
      successResponse(res, topUpHistories, 'Top-up histories retrieved successfully');
    } catch (error) {
      console.error('Error retrieving top-up histories:', error);
      // Berikan respons error jika terjadi kesalahan
      errorResponse(res, 500, 'Failed to retrieve top-up histories');
    }
  };

// Fungsi controller untuk menghapus riwayat top-up berdasarkan ID riwayat
exports.deleteTopUpHistory = async (req, res) => {
    const { topUpId } = req.params;
  
    try {
      // Temukan dan hapus riwayat top-up berdasarkan ID riwayat
      const deletedTopUp = await TopUpHistory.findByIdAndDelete(topUpId);
  
      if (!deletedTopUp) {
        return errorResponse(res, 404, 'Top-up history not found');
      }
  
      // Berikan respons sukses dengan data riwayat top-up yang dihapus
      successResponse(res, deletedTopUp, 'Top-up history deleted successfully');
    } catch (error) {
      console.error('Error deleting top-up history:', error);
      // Berikan respons error jika terjadi kesalahan
      errorResponse(res, 500, 'Failed to delete top-up history');
    }
};
  