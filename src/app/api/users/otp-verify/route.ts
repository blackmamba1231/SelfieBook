import { connect } from "@/dbConfig/dbConfig";
import User1 from "@/models/user";
import Account1 from "@/models/account";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import { z } from "zod";
import { Verified } from "lucide-react";
import jwt from "jsonwebtoken";

connect();
const otpSchema = z.object({
    username: z.string(),
    otp: z.string().length(6),
});
export async function POST(request: NextRequest) {
    const reqbody = await request.json();
    const { success } = otpSchema.safeParse(reqbody);
    if (!success) {
        return NextResponse.json({ message: "Incorrect OTP inputs" });
    }
    const { username, otp } = reqbody;
    const account = await Account1.findOne({ username });
    if (!account || !account.otp) {
        return NextResponse.json({ message: "Invalid username or OTP" });
    }
    if (Date.now() > account.otpExpiresAt) {
        return NextResponse.json({ message: "OTP has expired" });
    }
    const isOTPValid = await bcryptjs.compare(otp, account.otp);
    if (!isOTPValid) {
        return NextResponse.json({ message: "Invalid OTP" });
    }
    await Account1.findOneAndUpdate({ username }, { Verified: true });
    const hashedPassword = account.password;
    const user = await User1.create({
        username: account.username,
        password: hashedPassword,
        firstName: account.firstName,
        lastName: account.lastName,
    });
  
    await user.save();
    const userId = user._id;
    await Account1.updateOne( { userId: userId })
    const token = jwt.sign({ userId }, process.env.jWT_Secret!);
    return NextResponse.json({ success: true, token, message: "OTP verified successfully", verified: true });

}

