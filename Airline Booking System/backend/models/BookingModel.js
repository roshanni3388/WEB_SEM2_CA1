const mongoose = require('mongoose');

const PassengerSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    bookingType: { type: String, required: true }
});