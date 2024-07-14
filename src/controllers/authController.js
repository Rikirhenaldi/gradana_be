const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Balance = require('../models/Balance');
const { successResponse, errorResponse } = require('../utils/response');

exports.register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return errorResponse(res, 400, 'User already exists');
    }
    user = new User({ name, phone, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const balance = new Balance({ user: user.id });
    await balance.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      successResponse(res, { token }, 'Registration success', 200);
    });
  } catch (err) {
    console.error(err.message);
    errorResponse(res, 500, 'Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
