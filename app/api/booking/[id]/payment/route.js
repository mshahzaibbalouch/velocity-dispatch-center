import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { authorizeRequest } from '@/app/api/booking/auth';

// PATCH update payment status
export async function PATCH(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin', 'dispatcher']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { id } = params;
    const body = await req.json();
    const { paymentStatus, paymentMethod } = body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    if (paymentStatus) {
      if (!['pending', 'completed', 'refunded'].includes(paymentStatus)) {
        return NextResponse.json(
          { success: false, message: 'Invalid payment status' },
          { status: 400 }
        );
      }
      booking.paymentStatus = paymentStatus;
    }

    if (paymentMethod) {
      if (!['cash', 'card', 'wallet', 'online'].includes(paymentMethod)) {
        return NextResponse.json(
          { success: false, message: 'Invalid payment method' },
          { status: 400 }
        );
      }
      booking.paymentMethod = paymentMethod;
    }

    booking.updatedAt = new Date();
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Payment information updated successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
