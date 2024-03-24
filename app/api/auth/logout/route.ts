import { USER_TOKEN } from "@lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(_: Request) {
  cookies().delete("user_info");
  cookies().delete(USER_TOKEN);
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
