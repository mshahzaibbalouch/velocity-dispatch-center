import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { authorizeRequest } from '@/app/api/booking/auth';

export async function GET(req) {
  try {
    const auth = authorizeRequest(req, ['admin', 'dispatcher']);
    if (auth.error) return auth.response;

    await dbConnect();

    const [active, completed, scheduled, cancelled] = await Promise.all([
      Booking.countDocuments({ status: { $in: ["confirmed", "driver_assigned", "driver_arrived", "picked_up", "in_transit"] } }),
      Booking.countDocuments({ status: "completed" }),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: { $in: ["cancelled", "no_show", "dropped_out"] } }),
    ]);

    return NextResponse.json({
      success: true,
      data : [
        {
            title: "Active Rides",
            value: active.toString(),
            icon: "Car",
            color: "amber",
          },
          {
            title: "Completed",
            value: completed.toString(),
            icon: "CircleCheck",
            color: "emerald",
          },
          {
            title: "Scheduled",
            value: scheduled.toString(),
            icon: "Clock3",
            color: "blue",
          },
          {
            title: "Cancelled",
            value: cancelled.toString(),
            icon: "CircleX",
            color: "red",
          },
      ]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}