import { connect } from "@/dbConfig/dbConfig";
import User1 from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(req: NextRequest) {

    const reqbody = await req.json();
    console.log(reqbody);
    const userid = reqbody.userId;
    const user = await User1.findOne({ _id: userid });
    if(!user) {
        return NextResponse.json({ success: false, message: 'User not found' });
    }
    const response = await User1.findOneAndUpdate({ _id: userid }, { 
        uniqueId: reqbody.uniqueId, avatar: reqbody.avatar, bio: reqbody.bio, });

    if(response){
        return NextResponse.json({ success: true, message: "Profile updated" });
    }else {
        return NextResponse.json({ success: false, message: "Profile not updated" });
    }
}