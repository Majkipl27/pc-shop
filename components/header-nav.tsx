import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav(): JSX.Element {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6 font-poppins font-extralight text-sm h-fit">
      <a
        title="Documentation"
        target="_blank"
        href="https://avorty.github.io/spito"
        className="text-foreground/60 hover:text-foreground/80 transition-colors"
      >
        Docs
      </a>
      <Link
        href="/marketplace"
        className={cn(
          "text-foreground/60 hover:text-foreground/80 transition-colors",
          pathname === "/marketplace" &&
            "text-foreground hover:text-foreground"
        )}
      >
        Marketplace
      </Link>
      <Link
        href="/download"
        className={cn(
          "text-foreground/60 hover:text-foreground/80 transition-colors",
          pathname === "/download" &&
            "text-foreground hover:text-foreground"
        )}
      >
        Download
      </Link>
    </nav>
  );
}
