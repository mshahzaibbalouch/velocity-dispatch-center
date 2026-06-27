import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';

// GET a single booking by ID
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const booking = await Booking.findById(id)
      .populate('passengerId', 'name email')
      .populate('driverId', 'name email');

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH update booking details
export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await req.json();

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update allowed fields
    const allowedFields = [
      'pickupLocation',
      'dropLocation',
      'price',
      'distance',
      'estimatedDuration',
      'paymentMethod',
      'notes',
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        booking[field] = body[field];
      }
    });

    booking.updatedAt = new Date();
    await booking.save();
    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE cancel or delete booking
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    await Booking.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
