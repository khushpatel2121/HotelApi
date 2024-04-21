import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      specialRequest: {
        type: String,
        required: false,
      },
      cartItems: [{
        // Assuming cartItems is an array of objects
        // You may need to adjust this based on your actual data structure
        room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Room', // Reference to another Mongoose model
        },
        selectedDates: {
          type: Object, // Assuming selectedDates is an object
        },
        options: {
          type: Object, // Assuming options is an object
        },
      }],
      totalAmount: {
        type: Number,
        required: true,
      },
      paymentDetails: {
        type: Object, // Assuming paymentDetails is an object
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      
    },
    {                                       
      timestamps: true, })   ;
    

export default mongoose.model('Booking', BookingSchema);