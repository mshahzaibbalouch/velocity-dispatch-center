import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authorizeRequest } from '@/app/api/booking/auth';

// GET all drivers with admin-only access
export async function GET(req) {
  try {
    // Only admins can access the drivers list
    const auth = authorizeRequest(req, ['admin']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const skip = (page - 1) * limit;

    // Build filter
    const filter = { role: 'driver' };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const drivers = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: drivers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST create a new driver (admin-only)
export async function POST(req) {
  try {
    const auth = authorizeRequest(req, ['admin']);
    if (auth.error) return auth.response;

    await dbConnect();

    const body = await req.json();
    const { name, email, companyName, avatar } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, email' },
        { status: 400 }
      );
    }

    // Check if driver already exists
    const existingDriver = await User.findOne({ email });
    if (existingDriver) {
      return NextResponse.json(
        { success: false, message: 'Driver with this email already exists' },
        { status: 400 }
      );
    }

    const driver = new User({
      name,
      email,
      companyName: companyName || '',
      avater: avatar || '',
      role: 'driver',
      password: '', // Password should be set by the driver later
    });

    await driver.save();

    return NextResponse.json(
      { success: true, data: driver },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating driver:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
