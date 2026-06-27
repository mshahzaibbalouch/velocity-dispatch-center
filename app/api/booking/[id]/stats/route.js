import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET booking statistics
export async function GET(req, { params }) {
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

    const stats = {
      id: booking._id,
      status: booking.status,
      distance: booking.distance,
      estimatedDuration: booking.estimatedDuration,
      actualDuration: booking.actualDuration,
      price: booking.price,
      rating: booking.rating,
      pickupTime: booking.pickupTime,
      dropoffTime: booking.dropoffTime,
      paymentStatus: booking.paymentStatus,
      paymentMethod: booking.paymentMethod,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
