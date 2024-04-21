import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
      rooms: [{
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Room',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
      }],
      dateRange: {
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date,
          required: true
        }
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

export default mongoose.model("Cart", CartSchema);