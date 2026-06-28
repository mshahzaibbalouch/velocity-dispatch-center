import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { authorizeRequest } from '@/app/api/booking/auth';

// POST assign a driver to booking
export async function POST(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin', 'dispatcher']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { id } = params;
    const body = await req.json();
    const { driverId } = body;

    if (!driverId) {
      return NextResponse.json(
        { success: false, message: 'driverId is required' },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify driver exists
    const driver = await User.findById(driverId);
    if (!driver || driver.role !== 'driver') {
      return NextResponse.json(
        { success: false, message: 'Driver not found or invalid' },
        { status: 404 }
      );
    }

    booking.driverId = driverId;
    booking.status = 'driver_assigned';
    booking.updatedAt = new Date();
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Driver assigned successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error assigning driver:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
