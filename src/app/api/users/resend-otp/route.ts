import { connect } from "@/dbConfig/dbConfig";

import Account1 from "@/models/account";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';


connect();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
export async function POST(request: NextRequest){

    const reqbody = await request.json();
    const otp = speakeasy.totp({
        secret: process.env.OTP_SECRET || "Hey I am secret",
        encoding: 'base32',
        step: 300, // OTP valid for 5 minutes
      });
    const hashedOTP = await bcryptjs.hash(otp, 10);
    await Account1.findOneAndUpdate({ username: reqbody.username }, { otp: hashedOTP, otpExpiresAt: Date.now() + 300000 });
    const mailOptions = {
        from: process.env.EMAIL,
        to: reqbody.username,
        subject: 'Your OTP for SelfieBook',
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({
        success: true,
        message: "OTP re-sent to your email. Please verify to complete signup.",
      });
}