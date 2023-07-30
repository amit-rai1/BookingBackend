const Booking = require('../model/bookingModel');

// POST /bookings
const createBooking = async (req, res) => {
  try {
    const { roomId, userId, checkInDate, checkOutDate,status  } = req.body;
    const newBooking = await Booking.create({ roomId, userId, checkInDate, checkOutDate ,status });
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getBookingRequests = async (req, res) => {
  try {
    const bookingRequests = await Booking.find({ status: 'pending' });
    res.status(200).json({ bookingRequests });
  } catch (error) {
    console.error('Error getting booking requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    res.status(200).json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    
    // Fetch the booking by its ID from the database
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the status of the booking to 'rejected'
    booking.status = 'rejected';
    await booking.save();

    res.status(200).json({ message: 'Booking rejected successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking and set the status to 'cancelled'
    const cancelledBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'cancelled' },
      { new: true }
    );

    res.status(200).json({ message: 'Booking cancelled successfully', booking: cancelledBooking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { createBooking,getBookingRequests,cancelBooking,updateBookingStatus,rejectBooking };
