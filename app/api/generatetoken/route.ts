import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Define the type for the response body

// The handler function for the API route
export async function GET() {
  // Get API key and secret from environment variables
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  // Validate API key and secret
  if (!apiKey || !apiSecret) {
    return new NextResponse("API key or secret not configured in environment variables",{status:500})
  }

  try {
    // Generate JWT
    const token = jwt.sign(
      {
        iss: apiKey,
        exp: Math.floor(Date.now() / 1000) + 3600, // Token expires in 1 hour
      },
      apiSecret
    );

    // Return the token
    return NextResponse.json({token: `Bearer ${token}`})
  } catch (error) {
    console.error("Error generating token:", error);
    return new NextResponse("Internal Server Error",{status:500})
  }
}
