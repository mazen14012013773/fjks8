const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('[UNCAUGHT EXCEPTION]', err);
    process.exit(1);
});

// Initialize Express App
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check before routes
app.get('/health', (req, res) => {
    res.json({ ok: true, message: 'Server is alive' });
});

// Import Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const messageRoutes = require('./routes/messages');
const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ ok: true, message: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        error: 'Route not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(status).json({
        ok: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start Server
const PORT = process.env.PORT || 3000;

// Connect to Database and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════╗
║   FreelanceHub Backend Server      ║
║   Running on port ${PORT}           ║
║   Environment: ${process.env.NODE_ENV || 'development'}      ║
╚════════════════════════════════════╝
    `);
    });
}).catch(err => {
    // Database connection failed, but server will still start
    console.warn('Database connection error, starting server anyway...');
    const server = app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════╗
║   FreelanceHub Backend Server      ║
║   Running on port ${PORT}           ║
║   Environment: ${process.env.NODE_ENV || 'development'}      ║
║   ⚠️  Database Unavailable          ║
╚════════════════════════════════════╝
    `);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        console.error('[UNHANDLED REJECTION]', err);
        server.close(() => {
            process.exit(1);
        });
    });
});

module.exports = app;
