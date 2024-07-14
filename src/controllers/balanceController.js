const Balance = require('../models/Balance');
const { successResponse, errorResponse } = require('../utils/response');

// Fungsi controller untuk membuat saldo baru untuk pengguna
exports.createUserBalance = async (req, res) => {
    const { initialBalance } = req.body;
    const userId = req?.authUser?.user?.id; // Mengambil userId dari token JWT

    try {
        // Buat objek saldo baru
        const newBalance = new Balance({
            user: userId,
            balance: initialBalance,
        });

        // Simpan objek saldo ke dalam database
        await newBalance.save();

        // Berikan respons sukses
        successResponse(res, newBalance, 'User balance created successfully');
    } catch (error) {
        console.error('Error creating user balance:', error);
        // Berikan respons error jika terjadi kesalahan
        errorResponse(res, 500, 'Failed to create user balance');
    }
};

// Fungsi controller untuk membaca saldo pengguna berdasarkan ID pengguna
exports.getUserBalance = async (req, res) => {
    const userId = req?.authUser?.user?.id; // Mengambil userId dari token JWT

    try {
        // Temukan saldo pengguna berdasarkan ID pengguna
        const userBalance = await Balance.findOne({ user: userId });

        if (!userBalance) {
            return errorResponse(res, 404, 'User balance not found');
        }

        // Berikan respons sukses
        successResponse(res, userBalance, 'User balance retrieved successfully');
    } catch (error) {
        console.error('Error retrieving user balance:', error);
        // Berikan respons error jika terjadi kesalahan
        errorResponse(res, 500, 'Failed to retrieve user balance');
    }
};

// Fungsi controller untuk menghapus saldo pengguna berdasarkan ID pengguna
exports.deleteUserBalance = async (req, res) => {
    const userId = req?.authUser?.user?.id; // Mengambil userId dari token JWT

    try {
        // Temukan dan hapus saldo pengguna berdasarkan ID pengguna
        const deletedBalance = await Balance.findOneAndDelete({ user: userId });

        if (!deletedBalance) {
            return errorResponse(res, 404, 'User balance not found');
        }

        // Berikan respons sukses
        successResponse(res, deletedBalance, 'User balance deleted successfully');
    } catch (error) {
        console.error('Error deleting user balance:', error);
        // Berikan respons error jika terjadi kesalahan
        errorResponse(res, 500, 'Failed to delete user balance');
    }
};


// Fungsi controller untuk memperbarui saldo pengguna
exports.updateUserBalance = async (req, res) => {
    const { amount } = req.body;
    const userId = req?.authUser?.user?.id; // Mengambil userId dari token JWT

    try {
        // Temukan pengguna berdasarkan ID
        let userBalance = await Balance.findOne({ user: userId });

        if (!userBalance) {
            return errorResponse(res, 404, 'User not found');
        }

        // Update saldo pengguna
        userBalance.amount += amount;
        await userBalance.save();

        // Berikan respons sukses
        successResponse(res, userBalance, 'User balance updated successfully');
    } catch (error) {
        console.error('Error updating user balance:', error);
        // Berikan respons error jika terjadi kesalahan
        errorResponse(res, 500, 'Failed to update user balance');
    }
};
