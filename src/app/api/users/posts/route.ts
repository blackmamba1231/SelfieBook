import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post";

import { NextRequest, NextResponse } from "next/server";

connect();  
export async function POST(request:NextRequest) {
    const reqbody = await request.json();
    const userid = reqbody.userId;
    const posts = await Post.findOne({ user: userid });
    if(!posts) {
        return NextResponse.json({ success: false, message: 'Post not Found' });
    }
    return NextResponse.json({ success: true, posts });
}