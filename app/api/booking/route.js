import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';

// GET all bookings or filter by query parameters
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const passengerId = searchParams.get('passengerId');
    const driverId = searchParams.get('driverId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const filter = {};
    if (passengerId) filter.passengerId = passengerId;
    if (driverId) filter.driverId = driverId;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(filter)
      .populate('passengerId', 'name email')
      .populate('driverId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST create a new booking
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { pickupLocation, dropLocation, passengerId, price, distance, estimatedDuration, paymentMethod } = body;

    if (!pickupLocation || !dropLocation || !passengerId || !price || !distance) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: pickupLocation, dropLocation, passengerId, price, distance',
        },
        { status: 400 }
      );
    }

    // Verify passenger exists
    const passenger = await User.findById(passengerId);
    if (!passenger) {
      return NextResponse.json(
        { success: false, message: 'Passenger not found' },
        { status: 404 }
      );
    }

    const booking = new Booking({
      pickupLocation,
      dropLocation,
      passengerId,
      price,
      distance,
      estimatedDuration: estimatedDuration || Math.round((distance / 40) * 60), // estimate 40 km/h
      paymentMethod: paymentMethod || 'cash',
      status: 'pending',
    });

    await booking.save();
    const populatedBooking = await booking.populate('passengerId', 'name email');

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: populatedBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
