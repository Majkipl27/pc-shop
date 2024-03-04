import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@lib/utils";

export default function HeaderNav(): JSX.Element {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Motherboards",
      href: "/motherboards",
      description:
        "Motherboards are the main printed circuit board within a computer.",
    },
    {
      title: "Cpu's",
      href: "/cpus",
      description:
        "Cpu is the component of a computer that acts as its “control center”.",
    },
    {
      title: "Graphics cards",
      href: "/gpus",
      description:
        "A graphics processing unit (GPU) is a specialized processor originally designed to accelerate graphics rendering",
    },
    {
      title: "Memory",
      href: "/memory",
      description:
        "RAM is a computer's short-term memory, where the data that the processor is currently using is stored.",
    },
    {
      title: "Storage",
      href: "/storage",
      description:
        "Storage is the place where data is held for access by a computer processor.",
    },
    {
      title: "Power supply",
      href: "/power-supply",
      description:
        "A power supply is an electrical device that supplies electric power.",
    },
    {
      title: "Cases",
      href: "/cases",
      description:
        "A computer case, enclosure that contains most of the components.",
    },
    {
      title: "Cpu cooling",
      href: "/cooling",
      description: "CPU cooling is device, that cools your cpu.",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pc parts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Peripherals</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] flex items-center">
              <div className="flex flex-col gap-3 w-full">
                <ListItem
                  title="Headsets"
                  href="/headsets"
                  className="h-[100px]"
                >
                  A headset combines a headphone with a microphone.
                </ListItem>
                <ListItem title="Mouses" href="/mouses" className="h-[100px]">
                  A computer mouse is a hand-held pointing device that detects
                  two-dimensional motion.
                </ListItem>
                <ListItem
                  title="Monitors"
                  href="/monitors"
                  className="h-[100px]"
                >
                  A computer monitor is an output device that displays
                  information in pictorial form.
                </ListItem>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <ListItem
                  title="Keyboards"
                  href="/keyboards"
                  className="h-[150px]"
                >
                  A keyboard is a typewriter-style device that uses an
                  arrangement of buttons or keys to act as mechanical levers or
                  electronic switches.
                </ListItem>
                <ListItem
                  title="Printers"
                  href="/printers"
                  className="h-[150px]"
                >
                  A printer is a peripheral which makes a persistent human
                  readable representation of graphics or text on paper.
                </ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/configurator" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pc configurator
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="block">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
