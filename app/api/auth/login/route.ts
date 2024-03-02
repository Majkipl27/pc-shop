import { NextResponse } from "next/server";
import { sha512 } from "js-sha512";
import prisma from "@lib/prisma";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { USER_TOKEN, getJwtSecretKey } from "@lib/constants";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData || userData.password !== sha512(password)) {
      return NextResponse.json(
        { message: "Wrong email or password" },
        { status: 401 }
      );
    } else {
      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(getJwtSecretKey()));

      cookies().set(USER_TOKEN, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 2,
        sameSite: "lax",
      });

      cookies().set(
        "user_info",
        `{
        "email": "${userData.email}",
        "id": "${userData.id}"
      }`,
        {
          httpOnly: false,
          maxAge: 60 * 60 * 2,
          sameSite: "lax",
        }
      );

      return NextResponse.json(
        { message: "Succesfully logged in!" },
        {
          status: 200,
          headers: {
            "Set-Cookie": cookies().toString(),
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
