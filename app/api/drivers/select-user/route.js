import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authorizeRequest } from '@/app/api/booking/auth';

// GET all non-driver users (for adding drivers from existing users)
export async function GET(req) {
  try {
    const auth = authorizeRequest(req, ['admin']);
    if (auth.error) return auth.response;

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const filter = {
      role: { $in: ['dispatcher', 'admin'] },
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter)
      .select('name email companyName avater')
      .limit(50);

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST convert existing user to driver
export async function POST(req) {
  try {
    const auth = authorizeRequest(req, ['admin']);
    if (auth.error) return auth.response;

    await dbConnect();

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: 'driver' },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User converted to driver successfully',
    });
  } catch (error) {
    console.error('Error converting user to driver:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
