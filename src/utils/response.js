// Fungsi untuk mengirim respons sukses
const successResponse = (res, data = null, message = 'Success', status_code=200) => {
    return res.status(200).json({
      success: true,
      status_code,
      message,
      data,
    });
  };
  
  // Fungsi untuk mengirim respons error
  const errorResponse = (res, status_code=500, message = 'Internal Server Error', status = status_code || 500) => {
    return res.status(status).json({
      success: false,
      status_code,
      message,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  