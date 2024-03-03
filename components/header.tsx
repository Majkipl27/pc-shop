"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import HeaderNav from "./header-nav";
import { Cookies } from "typescript-cookie";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@lib/atoms";

export default function Header(): JSX.Element {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const userCookie = Cookies.get("user_info");
    if (userCookie) {
      setUser(JSON.parse(userCookie as string));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              {/* <img src={Logo} alt="" className="w-6 h-6" /> */}
              <span className="inline-block font-bold text-2xl">Pc-shop</span>
            </Link>
            <HeaderNav />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              {user ? (
                <Link
                  href="/auth/logout"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
