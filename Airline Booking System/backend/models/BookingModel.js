const mongoose = require('mongoose');

const PassengerSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    bookingType: { type: String, required: true }
});

const BookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight"
    },
    bookingId: { type: String, required: true },
    date: { type: Date ,default:Date.now},
    total: { type: String },
    passengers: [PassengerSchema] // Array of passengers
});

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;