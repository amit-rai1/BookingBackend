// src/controllers/roomController.js

const Room = require('../model/room');

const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ available: true });
    res.status(200).json({ rooms });
  } catch (error) {
    console.error('Error getting rooms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const addRoom = async (req, res) => {
//   try {
//     // Check for admin authentication here before proceeding
//     const { name, description, price } = req.body;
//     console.log(req.body,"yjgyuw");
//     const newRoom = await Room.create({ name, description, price });
//     res.status(201).json({ message: 'Room added successfully', room: newRoom });
//   } catch (error) {
//     console.error('Error adding room:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const updateRoom = async (req, res) => {
  try {
    // Check for admin authentication here before proceeding
    const { name, description, price, available } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { name, description, price, available },
      { new: true }
    );
    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    // Check for admin authentication here before proceeding
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);
    res.status(200).json({ message: 'Room deleted successfully', room: deletedRoom });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAvailableRooms, updateRoom, deleteRoom };
