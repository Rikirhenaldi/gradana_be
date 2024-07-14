const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (token) {
    console.log("ini >>>>", token)
    if (token.startsWith("Bearer")) {
      try {
        const token = req.headers.authorization.slice(7);
        console.log("ini >>>>", token)
        const user = jwt.verify(token, process.env.JWT_SECRET );
        req.authUser = user;
        console.log('ini auth usermid',req.authUser.user.id);
        next();
      } catch (err) {
        return errorResponse(res, 401, "Session Expired, You must be Login!");
      }
    }
  } else {
    return errorResponse(res, 401, "Auth Token Needed");
  }
};