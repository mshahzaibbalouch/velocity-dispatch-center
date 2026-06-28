// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getDashboardRoute } from "@/lib/auth";

export async function POST(req) {
  try {
    const { fullName, email, password, companyName } = await req.json();
    if (!fullName || !email || !password) {
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
    await dbConnect();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

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
    const publicCookie = `__ds_sid_public=${token}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 8}; ${secure ? "Secure;" : ""}`;
    const redirect = "/" + user.role + "/dashboard";
    const headers = new Headers();
    headers.append('Set-Cookie', cookie);
    headers.append('Set-Cookie', publicCookie);
    headers.append('Content-Type', 'application/json');

    return new Response(JSON.stringify({ ok: true, redirect }), {
      status: 201,
      headers,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err.message, err.stack);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
