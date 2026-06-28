import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { authorizeRequest } from '@/app/api/booking/auth';

// POST cancel a booking
export async function POST(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin', 'dispatcher']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { id } = params;
    const body = await req.json();
    const { cancellationReason } = body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Cannot cancel if already completed or already cancelled
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return NextResponse.json(
        { success: false, message: `Cannot cancel booking with status: ${booking.status}` },
        { status: 400 }
      );
    }

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason || 'No reason provided';
    booking.updatedAt = new Date();
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
