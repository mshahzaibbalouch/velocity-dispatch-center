import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authorizeRequest } from '@/app/api/booking/auth';

// UPDATE driver status
export async function PATCH(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status || !['online', 'offline', 'on_trip', 'break'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    const driver = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select('-password');

    if (!driver) {
      return NextResponse.json(
        { success: false, message: 'Driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: driver,
    });
  } catch (error) {
    console.error('Error updating driver status:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET driver by ID
export async function GET(req, { params }) {
  try {
    const auth = authorizeRequest(req, ['admin']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { id } = params;

    const driver = await User.findById(id).select('-password');

    if (!driver) {
      return NextResponse.json(
        { success: false, message: 'Driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: driver,
    });
  } catch (error) {
    console.error('Error fetching driver:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
