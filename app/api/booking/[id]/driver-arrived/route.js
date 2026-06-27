import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// POST driver arrived at pickup location
export async function POST(req, { params }) {
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

    if (!booking.driverId) {
      return NextResponse.json(
        { success: false, message: 'No driver assigned to this booking' },
        { status: 400 }
      );
    }

    booking.status = 'driver_arrived';
    booking.updatedAt = new Date();
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Driver arrived at pickup location',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
