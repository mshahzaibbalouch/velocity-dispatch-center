import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { authorizeRequest } from '@/app/api/booking/auth';

// PATCH add rating and review to completed booking
export async function PATCH(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin', 'dispatcher']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { id } = params;
    const body = await req.json();
    const { rating, review } = body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.status !== 'completed') {
      return NextResponse.json(
        { success: false, message: 'Can only rate completed bookings' },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (rating) booking.rating = rating;
    if (review) booking.review = review;
    booking.updatedAt = new Date();
    await booking.save();

    const updatedBooking = await booking.populate('passengerId', 'name email').populate('driverId', 'name email');

    return NextResponse.json({
      success: true,
      message: 'Rating and review added successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
