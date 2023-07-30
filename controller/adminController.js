// src/controllers/adminController.js
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const Admin = require('../model/admin');
const Room = require("../model/room")

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ email, password: hashedPassword, userType: 'admin' });

    res.status(201).json({ message: 'Admin signup successful', admin: newAdmin });
  } catch (error) {
    console.error('Error in admin signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create and sign a JSON Web Token (JWT)
      const token = jwt.sign({ userId: admin._id, userType: admin.userType }, 'secretkey', {
        expiresIn: '24h', // Token expires in 1 hour
      });
  
      res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
      console.error('Error in admin login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
// src/controllers/adminController.js

// ... (existing code)

const addRoom = async (req, res) => {
    try {
      const { name, description, price, available } = req.body;
  
      // You can add any necessary validation and error handling here
  
      const newRoom = await Room.create({ name, description, price, available });
      res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
      console.error('Error in adding room:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = { login, signup, addRoom }; // Include addRoom in the exports
  
// Other admin-related controller functions can be added here

// module.exports = { signup ,login};
