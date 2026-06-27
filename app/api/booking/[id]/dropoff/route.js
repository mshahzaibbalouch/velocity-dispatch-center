import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// POST passenger dropped off
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

    if (booking.status !== 'picked_up' && booking.status !== 'in_transit') {
      return NextResponse.json(
        { success: false, message: 'Booking must be in transit before dropoff' },
        { status: 400 }
      );
    }

    const dropoffTime = new Date();
    booking.status = 'completed';
    booking.dropoffTime = dropoffTime;
    
    // Calculate actual duration in minutes
    if (booking.pickupTime) {
      booking.actualDuration = Math.round((dropoffTime - booking.pickupTime) / 60000);
    }
    
    booking.updatedAt = dropoffTime;
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Passenger dropped off successfully',
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
