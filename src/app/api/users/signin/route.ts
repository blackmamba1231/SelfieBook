import User1 from "@/models/user";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function POST(req: NextRequest) {
    if(req.method === "POST") {
       try { 
        const reqbody = await req.json();    
        const { username, password } = reqbody;
        console.log(username);
        const user = await User1.findOne({ username });
        if(!user){
            console.log("User not found");
            return NextResponse.json({ success: false, message: 'Invalid Username or Password(user not found)'})

        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            console.log("Invalid password");
            return NextResponse.json({ success: false, message: 'Invalid password'});
        }
        const secretKey = process.env.jWT_Secret;
        if (!secretKey) {
            throw new Error("JWT_Secret is not defined in the environment variables");
        }
        const token = jwt.sign({ userId: user._id }, secretKey , { expiresIn: '1h' });
        const userId = user._id;

        return NextResponse.json({ success: true, token, userId });
       } catch (error) {
        console.error('Error during sign-in:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' });
       }
    }else {
    return NextResponse.json({ success: false, message: "Method not allowed" });
  }
}