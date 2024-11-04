import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
    await connect();
    try {
        const response = NextResponse.json(
            {
                message: "Logged out successfully",
                success: true,
            }
        )
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        return response;
    }
    catch(error : unknown){
        console.log(error)
        return Response.json(
            {status: 500}
        )
    }
}