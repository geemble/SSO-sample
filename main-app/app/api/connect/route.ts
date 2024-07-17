import { getDB, serverUser } from "@/lib/realm";
import { NextRequest, NextResponse } from "next/server";
type requestBody = {
  url: string;
  userid: string;
  connected: boolean;
};
export async function POST(request: NextRequest) {
  try {
    const server_user = await serverUser();
    const body = (await request.json()) as requestBody;
    const url = body.url;
    const userid = body.userid;
    const db = getDB(server_user);
    await db
      .collection("website_access")
      .updateOne({ userid }, { $push: { linked: url } }, { upsert: true });
    return NextResponse.json({ status: "connected" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}