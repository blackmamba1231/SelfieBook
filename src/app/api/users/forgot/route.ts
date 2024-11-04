import { connect } from "@/dbConfig/dbConfig";
import User1 from "@/models/user";
import Account1 from "@/models/account";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';

connect();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    await connect();
    const reqbody = await request.json();
    const { username } = reqbody;
    console.log(username);
    try {
      
      const user = await User1.findOne({ username: reqbody.username });
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' });
      }
  
      
      const account = await Account1.findOne({ username: reqbody.username });
      const password = reqbody.password;
      const hashedPassword = await bcryptjs.hash(password, 10);
      user.password = hashedPassword;
      account.password = hashedPassword;
      await account.save();
      return NextResponse.json({ success: true, message: 'Password reset successful' });
  
    } catch (error) {
      console.error('Error during password reset request:', error);
      return NextResponse.json({ success: false, message: 'An error occurred. Please try again.' });
    }
}