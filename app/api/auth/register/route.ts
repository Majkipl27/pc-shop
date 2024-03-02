import { sha512 } from "js-sha512";
import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (await isTaken(body.email)) {
      return NextResponse.json({ error: "Email is already taken" }, { status: 400 });
    }

    await prisma.user.create({
      data: {
        email: body.email,
        password: sha512(body.password),
      },
    });

    return NextResponse.json({ message: "Succesfully registered!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function isTaken(email: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email
      },
    });
    return Boolean(user);
  }