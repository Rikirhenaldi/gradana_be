const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const topUpHistoryRoutes = require('./routes/topUpHistoryRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware: Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware: Parse JSON bodies
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/topup-history', topUpHistoryRoutes);

module.exports = app;
