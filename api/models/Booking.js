const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Place",
	},
	checkIn: { type: Date, required: true },
	checkOut: { type: Date, required: true },
	guests: { type: Number, required: true },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	price: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
