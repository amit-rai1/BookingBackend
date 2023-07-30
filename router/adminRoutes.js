// src/routes/adminRoutes.js

const express = require('express');
const adminController = require('../controller/adminController');
const {isAdmin,authenticateUser} = require('../middleware/authMiddleware')


const router = express.Router();

// Admin Signup
router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/rooms', adminController.addRoom);


// Other admin-related routes can be added here

module.exports = router;
