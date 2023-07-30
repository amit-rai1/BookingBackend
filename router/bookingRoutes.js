const express = require('express');
const bookingController = require("../controller/bookingController")



const router = express.Router();





router.post('/room', bookingController.createBooking);
router.get('/requests', bookingController.getBookingRequests);
router.put('/accept/:bookingId', bookingController.updateBookingStatus);
router.post('/reject/:bookingId', bookingController.rejectBooking);
router.delete('/cancel/:bookingId', bookingController.cancelBooking);




module.exports = router;
