// src/routes/roomRoutes.js

const express = require('express');
const roomController = require('../controller/roomController');
// const { isAdmin } = require('../middleware/authMiddleware');
const {isAdmin} = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/', roomController.getAvailableRooms);


router.put('/:roomId', roomController.updateRoom);
router.delete('/:roomId',  roomController.deleteRoom);



module.exports = router;
