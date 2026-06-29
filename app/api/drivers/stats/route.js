import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authorizeRequest } from "@/app/api/booking/auth";

export async function GET(req) {
  try {
    const auth = authorizeRequest(req, ["admin"]);
    if (auth.error) return auth.response;

    await dbConnect();

    const [totalDrivers, online, onTrip, offline] = await Promise.all([
      User.countDocuments({ role: "driver" }),
      User.countDocuments({ role: "driver", status: "online" }),
      User.countDocuments({ role: "driver", status: "on_trip" }),
      User.countDocuments({ role: "driver", status: "offline" }),
    ]);

    return NextResponse.json({
  success: true,
  data: [
    {
      title: "Total Drivers",
      value: totalDrivers.toString(),
      icon: "User",
      color: "amber",
    },
    {
      title: "Online Now",
      value: online.toString(),
      icon: "CircleCheck",
      color: "emerald",
    },
    {
      title: "On Active Trip",
      value: onTrip.toString(),
      icon: "Clock3",
      color: "blue",
    },
    {
      title: "Offline Drivers",
      value: offline.toString(),
      icon: "CircleX",
      color: "red",
    },
  ],
});

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
