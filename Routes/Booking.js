import express from 'express';
import { createBooking ,getBookingByEmailOrPhoneNumber} from '../Controllers/Booking.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello world");
    }
);

router.get("/booking", getBookingByEmailOrPhoneNumber)

router.post("/new", createBooking)

export default router;