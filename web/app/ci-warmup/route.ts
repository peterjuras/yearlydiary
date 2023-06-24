import { NextResponse } from "next/server";
import { ciWarmup } from "../../lib/server/db";

export async function GET() {
  await ciWarmup();

  return NextResponse.json("ok");
}
