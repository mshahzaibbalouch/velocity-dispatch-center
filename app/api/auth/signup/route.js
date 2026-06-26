// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    console.log(req.json);
    
    const { fullName, email, password, companyName } = await req.json();
    if (!fullName || !email || !password || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }
    debugger;
    await dbConnect();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }
    debugger;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: fullName,
      email: email.toLowerCase(),
      companyName,
      password: hashedPassword,
      role: "dispatcher", // default role — set via admin panel, not email guessing
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    const secure = process.env.NODE_ENV === "production";
    const cookie = `__ds_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}; ${secure ? "Secure;" : ""}`;

    return new Response(JSON.stringify({ ok: true, redirect: "/dashboard" }), {
      status: 201,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
