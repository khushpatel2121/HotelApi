import Booking from "../Models/Booking.js";
import { createError } from "../utils/error.js";

export const createBooking = async (req, res, next) => {
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

export const updateBooking = async (req, res, next) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBooking);
    } catch (err) {
        next(err);
    }
};

export const deleteBooking = async (req, res, next) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking deleted");
    } catch (err) {
        next(err);
    }
}

export const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
        res.status(200).json(booking)
    } catch (err) {
        next(err)
    }
}

export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        next(err)
    }
}


export const findBookingByEmailOrPhone = async (req, res, next) => {
    const { email, phoneNumber } = req.body;

    try {
        let booking;

        // Check if email or phone number is provided
        if (email) {
            booking = await Booking.findOne({ email: email });
        } else if (phoneNumber) {
            booking = await Booking.findOne({ phoneNumber: phoneNumber });
        } else {
            return res.status(400).json({ message: "Email or phone number is required" });
        }

        // If booking is found, return it
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (err) {
        next(err);
    }
};

export const getBookingByEmailOrPhoneNumber = async (req, res, next) => {
    const { email, phoneNumber } = req.query;
  
    try {
      let booking;
      if (email) {
        // Find booking by email
        booking = await Booking.find({ email });
      } else if (phoneNumber) {
        // Find booking by phone number
        booking = await Booking.find({ phoneNumber });
      } else {
        return next(createError(400, "Email or phone number is required"));
      }
  
      if (!booking) {
        return next(createError(404, "Booking not found"));
      }
  
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  };
