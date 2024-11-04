import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { connect } from '@/dbConfig/dbConfig';
connect();
export async function POST(request: Request) {
  try {
    const { file } = await request.json(); // Parse the incoming JSON body

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: 'user_avatars',
    });

    // Return the secure URL of the uploaded image
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }
}
