import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { AccessToken } from 'livekit-server-sdk';

const createToken = async () => {
  // If this room doesn't exist, it'll be automatically created when the first
  // participant joins
  const roomName = 'quickstart-room';
  // Identifier to be used for participant.
  // It's available as LocalParticipant.identity with livekit-client SDK
  const participantName = 'quickstart-username';

  const at = new AccessToken(process.env.API_KEY, process.env.API_SECRET, {
    identity: participantName,
    // Token to expire after 10 minutes
    ttl: '10m',
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return await at.toJwt();
};

export async function GET() {
 
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  
  if (!apiKey || !apiSecret) {
    return new NextResponse("API key or secret not configured in environment variables",{status:500})
  }

  try {
    // Generate JWT
    const response = await createToken();

    // Return the token
    return NextResponse.json({token:`Bearer ${response}` })
  } catch (error) {
    console.error("Error generating token:", error);
    return new NextResponse("Internal Server Error",{status:500})
  }
}
