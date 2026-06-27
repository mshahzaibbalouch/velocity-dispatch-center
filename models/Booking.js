import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'driver_assigned',
      'driver_arrived',
      'picked_up',
      'in_transit',
      'completed',
      'cancelled',
      'no_show',
      'dropped_out',
    ],
    default: 'pending',
  },
  pickupTime: {
    type: Date,
  },
  dropoffTime: {
    type: Date,
  },
  estimatedDuration: {
    type: Number, // in minutes
  },
  actualDuration: {
    type: Number, // in minutes
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'wallet', 'online'],
    default: 'cash',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
  cancellationReason: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
