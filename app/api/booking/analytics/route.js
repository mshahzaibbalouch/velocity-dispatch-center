import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET all booking statistics
export async function GET(req) {
  try {
    await dbConnect();

    const bookings = await Booking.find();

    // Calculate statistics
    const stats = {
      total: bookings.length,
      byStatus: {},
      byPaymentStatus: {},
      revenue: 0,
      avgDistance: 0,
      avgDuration: 0,
      avgRating: 0,
      ratedBookings: 0,
    };

    // Initialize status counts
    const statuses = [
      'pending',
      'confirmed',
      'driver_assigned',
      'driver_arrived',
      'picked_up',
      'in_transit',
      'completed',
      'cancelled',
      'dropped_out',
      'no_show',
    ];

    statuses.forEach((status) => {
      stats.byStatus[status] = 0;
    });

    // Initialize payment status counts
    const paymentStatuses = ['pending', 'completed', 'refunded'];
    paymentStatuses.forEach((status) => {
      stats.byPaymentStatus[status] = 0;
    });

    // Calculate stats
    let totalDistance = 0;
    let totalDuration = 0;
    let totalRating = 0;

    bookings.forEach((booking) => {
      // Count by status
      if (stats.byStatus.hasOwnProperty(booking.status)) {
        stats.byStatus[booking.status]++;
      }

      // Count by payment status
      if (stats.byPaymentStatus.hasOwnProperty(booking.paymentStatus)) {
        stats.byPaymentStatus[booking.paymentStatus]++;
      }

      // Revenue from completed bookings
      if (booking.status === 'completed' && booking.paymentStatus === 'completed') {
        stats.revenue += booking.price;
      }

      // Distance
      if (booking.distance) {
        totalDistance += booking.distance;
      }

      // Duration
      if (booking.actualDuration) {
        totalDuration += booking.actualDuration;
      }

      // Rating
      if (booking.rating) {
        totalRating += booking.rating;
        stats.ratedBookings++;
      }
    });

    stats.avgDistance = bookings.length > 0 ? (totalDistance / bookings.length).toFixed(2) : 0;
    stats.avgDuration =
      bookings.filter((b) => b.actualDuration).length > 0
        ? (totalDuration / bookings.filter((b) => b.actualDuration).length).toFixed(2)
        : 0;
    stats.avgRating = stats.ratedBookings > 0 ? (totalRating / stats.ratedBookings).toFixed(2) : 0;

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
