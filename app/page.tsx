import { Boxes } from "@components/ui/background-boxes";
import { cn } from "@lib/utils";
import { IconArrowRight, IconCategory, IconClipboard, IconDoorEnter } from "@tabler/icons-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen relative w-full overflow-hidden flex items-center justify-evenly rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />

      <Boxes />
      <div className="flex flex-col -mt-32 gap-8 z-40 p-8 pr-16 rounded-xl border-2 dark:shadow-neutral-700 shadow-lg dark:border-neutral-700 border-neutral-400 bg-background/20 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <h1 className={cn("font-bold text-7xl relative z-20")}>Pc_shop</h1>
        <p className="text-4xl mt-2 text-neutral-500 dark:text-neutral-300 font-semibold relative z-20 mx-0">
          The best place <br /> to buy your pc parts
        </p>
      </div>
      <div
        style={{
          transform: `skewX(-24deg) skewY(14deg) rotate(0deg) translateZ(0)`,
        }}
        className="flex flex-col relative space-y-2 p-2 w-[400px] z-40  rounded-xl border-2 dark:shadow-neutral-700 shadow-lg dark:border-neutral-700 border-neutral-400 bg-background/20 backdrop-blur-sm supports-[backdrop-filter]:bg-background/20 mt-32"
      >
        <p className="absolute -top-8 left-2 text-xl">Check these out!</p>
        <Link href="/configurator" legacyBehavior passHref>
          <div className="group inline-flex h-9 w-full items-center justify-between hover:px-5 py-6 rounded-md bg-background px-4 text-lg font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer">
            <span className="flex items-center gap-2">
              <IconClipboard />
              Try out the configurator!
            </span>
            <IconArrowRight className="ml-2" />
          </div>
        </Link>
        <Link href="/auth/login" legacyBehavior passHref>
          <div className="group inline-flex h-9 w-full items-center justify-between hover:px-5 py-6 rounded-md bg-background px-4 text-lg font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer">
            <span className="flex items-center gap-2">
              <IconDoorEnter />
              Log in!
            </span>
            <IconArrowRight className="ml-2" />
          </div>
        </Link>
        <Link href="/categories" legacyBehavior passHref>
          <div className="group inline-flex h-9 w-full items-center justify-between hover:px-5 py-6 rounded-md bg-background px-4 text-lg font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer">
            <span className="flex items-center gap-2">
              <IconCategory />
              Browse categories!
            </span>
            <IconArrowRight className="ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
}
