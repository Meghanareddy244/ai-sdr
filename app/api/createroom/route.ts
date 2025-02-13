import { NextResponse,NextRequest } from "next/server";
import { RoomServiceClient } from 'livekit-server-sdk';

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const livekitHost = 'https://hubspotautomation-avrhc09f.livekit.cloud';
const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

export async function POST(req:NextRequest){
    try {

        const body = await req.json();

        // Verify and set default options
        const opts = {
            name: body.name || 'default_room_name', // Fallback to default name if not provided
            emptyTimeout: body.emptyTimeout || 300, // 5 minutes default
            maxParticipants: body.maxParticipants || 2, // Default max participants
            recording: body.recording || false, // Enable recording if provided
            aiFeatures: {
                transcription: body.aiFeatures?.transcription || false,
                conversationFlow: body.aiFeatures?.conversationFlow || false,
                summarization: body.aiFeatures?.summarization || false,
            },
        };

    // const opts = {
    //     name: 'myroom',
    //     emptyTimeout: 2 * 60, // 10 minutes
    //     maxParticipants: 2,
    //   };
    const room= await roomService.createRoom(opts)
    return NextResponse.json(room)

    } catch (error) {
        console.error("Error generating token:", error);
        return new NextResponse("Internal Server Error",{status:500})
      }
      
}