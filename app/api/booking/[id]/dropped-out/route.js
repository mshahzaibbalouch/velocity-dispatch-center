import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { authorizeRequest, forbiddenResponse } from '@/app/api/booking/auth';

// POST mark booking as dropped out (no show)
export async function POST(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin', 'dispatcher', 'driver']);
    if (auth.error) return auth.response;
    const user = auth.user;

    await dbConnect();

    const { id } = params;
    const body = await req.json();
    const { notes } = body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    if (user.role === 'driver' && String(booking.driverId) !== String(user.id)) {
      return forbiddenResponse('You do not have access to this booking');
    }

    // Can only mark as dropped out if driver arrived
    if (booking.status !== 'driver_arrived') {
      return NextResponse.json(
        { success: false, message: 'Can only mark as dropped out when driver has arrived' },
        { status: 400 }
      );
    }

    booking.status = 'dropped_out';
    if (notes) booking.notes = notes;
    booking.updatedAt = new Date();
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Booking marked as dropped out',
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
