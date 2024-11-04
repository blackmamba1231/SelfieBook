import { connect } from "@/dbConfig/dbConfig";
import User1 from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request:NextRequest) {
    const reqbody = await request.json();
    const userid = reqbody.userId;
    const user = await User1.findOne({ _id: userid });
    if(!user) {
        return NextResponse.json({ success: false, message: 'User not found' });
    }
    return NextResponse.json({ success: true, user });
}