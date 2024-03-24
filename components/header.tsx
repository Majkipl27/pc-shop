"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import HeaderNav from "./header-nav";
import { Cookies } from "typescript-cookie";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@lib/atoms";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  IconClock,
  IconDoorExit,
  IconSearch,
  IconShoppingCart,
} from "@tabler/icons-react";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";

export default function Header(): JSX.Element {
  const [user, setUser] = useAtom(userAtom);
  const pathname = usePathname();

  useEffect(() => {
    const userCookie = Cookies.get("user_info");
    if (userCookie) {
      setUser(JSON.parse(userCookie as string));
    } else {
      setUser(null);
    }
  }, []);

  async function logoutHandler() {
    const req = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (req.status !== 200) return toast({ title: "Cannot logout" });
    toast({
      title: "Logged out",
    });
    Cookies.remove("user_info");
    setUser(null);
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

  return !pathname.startsWith("/auth") ? (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 gap-2 max-w-screen-2xl items-center">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <img src={Logo} alt="" className="w-6 h-6" /> */}
            <span className="inline-block font-bold text-2xl">Pc_shop</span>
          </Link>
          <HeaderNav />
        </div>
        <div className="flex items-center gap-2">
          <Input type="text" className="w-72" placeholder="Search" />
          <Button variant="outline">
            <IconSearch />
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" asChild>
                    <span className="text-foreground/60 hover:text-foreground/80 transition-colors">
                      {user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/cart">Cart</Link>
                      <DropdownMenuShortcut>
                        <IconShoppingCart className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/purchase-history">Purchase history</Link>
                      <DropdownMenuShortcut>
                        <IconClock className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Logout
                      <DropdownMenuShortcut>
                        <IconDoorExit className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" asChild>
                <Link
                  href="/auth/login"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                  Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  ) : (
    <div className="p-4 absolute flex items-center gap-2 z-50">
      <Button variant="outline" asChild>
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block text-base text-foreground/60 hover:text-foreground/80">
            Back to Home
          </span>
        </Link>
      </Button>
      <ModeToggle />
    </div>
  );
}
