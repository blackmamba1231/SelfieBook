import { connect } from "@/dbConfig/dbConfig";

import Account1 from "@/models/account";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import { z } from "zod";


connect();

// Define Zod schema for incoming request body
const signupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const reqBody = await req.json();
      console.log(reqBody);

      const validation = signupSchema.safeParse(reqBody);
      if (!validation.success) {
        return NextResponse.json({ message: "Incorrect inputs" });
      }
      const unverifiedUser = await Account1.findOne({ username: reqBody.username, Verified: false });
      if (unverifiedUser) {
          await Account1.findOneAndDelete({ username: reqBody.username });
          console.log("Deleted unverified user:", unverifiedUser);
      }
      // Check if user already exists
      // Check if username exists
      const user = await Account1.findOne({ username: reqBody.username, Verified: true });  // "Verified" should be "verified" (case-sensitive)

      // Check if a verified user already exists
      if (user) {
          console.log("User already exists");
          return NextResponse.json({ success: false, message: "User already exists" });
          
      }
      // Check for an unverified user and delete if found
      // Generate OTP and hashed data
      const otp = speakeasy.totp({
        secret: process.env.OTP_SECRET || "Hey I am secret",
        encoding: 'base32',
        step: 300, // OTP valid for 5 minutes
      });
      const hashedOTP = await bcryptjs.hash(otp, 10);
      const hashedPassword = await bcryptjs.hash(reqBody.password, 10);

      // Create account
      const account = await Account1.create({
        username: reqBody.username,
        password: hashedPassword,
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        otp: hashedOTP,
        otpExpiresAt: Date.now() + 300000, 
        Verified: false,
      });
      console.log(account);
      account.save();

      // Send OTP via email
      const mailOptions = {
        from: process.env.EMAIL,
        to: reqBody.username,
        subject: 'Your OTP for SelfieBook',
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({
        success: true,
        message: "OTP sent to your email. Please verify to complete signup.",
      });
    
    
    } catch (error) {
      console.error("Error during signup:", error);
      return NextResponse.json({ message: "Server error. Please try again later." });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" });
  }
}
