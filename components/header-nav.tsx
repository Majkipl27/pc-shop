"use client";
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
import {
  IconBolt,
  IconBox,
  IconClipboard,
  IconCpu,
  IconDeviceComputerCamera,
  IconDeviceDesktop,
  IconDeviceFloppy,
  IconDevicesPc,
  IconFrame,
  IconHeadset,
  IconKeyboard,
  IconMouse,
  IconPhotoScan,
  IconPrinter,
  IconPropeller,
  IconRuler2,
} from "@tabler/icons-react";

export default function HeaderNav(): JSX.Element {
  const components: {
    icon: JSX.Element;
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      icon: <IconFrame className="w-5 h-5" />,
      title: "Motherboards",
      href: "/products?category=motherboards",
      description:
        "Motherboards are the main printed circuit board within a computer.",
    },
    {
      icon: <IconCpu className="w-5 h-5" />,
      title: "Cpu's",
      href: "/products?category=cpus",
      description:
        "Cpu is the component of a computer that acts as its “control center”.",
    },
    {
      icon: <IconPhotoScan className="w-5 h-5" />,
      title: "Graphics cards",
      href: "/products?category=gpus",
      description:
        "A graphics processing unit (GPU) is a specialized processor originally designed to accelerate graphics rendering",
    },
    {
      icon: <IconRuler2 className="w-5 h-5" />,
      title: "Memory",
      href: "/products?category=memory",
      description:
        "RAM is a computer's short-term memory, where the data that the processor is currently using is stored.",
    },
    {
      icon: <IconDeviceFloppy className="w-5 h-5" />,
      title: "Storage",
      href: "/products?category=storage",
      description:
        "Storage is the place where data is held for access by a computer processor.",
    },
    {
      icon: <IconBolt className="w-5 h-5" />,
      title: "Power supply",
      href: "/products?category=power-supply",
      description:
        "A power supply is an electrical device that supplies electric power.",
    },
    {
      icon: <IconBox className="w-5 h-5" />,
      title: "Cases",
      href: "/products?category=cases",
      description:
        "A computer case, enclosure that contains most of the components.",
    },
    {
      icon: <IconPropeller className="w-5 h-5" />,
      title: "Cpu cooling",
      href: "/products?category=cooling",
      description: "CPU cooling is device, that cools your cpu.",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <IconDevicesPc className="mr-2 w-5 h-5" /> Pc parts
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <IconPrinter className="mr-2 w-5 h-5" />
            Peripherals
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] flex items-center">
              <div className="flex flex-col gap-3 w-full">
                <ListItem
                  title="Headsets"
                  href="/products?category=headsets"
                  icon={<IconHeadset className="w-5 h-5" />}
                  className="h-[100px]"
                >
                  A headset combines a headphone with a microphone.
                </ListItem>
                <ListItem
                  title="Mice"
                  href="/products?category=mice"
                  icon={<IconMouse className="w-5 h-5" />}
                  className="h-[100px]"
                >
                  A computer mouse is a hand-held pointing device that detects
                  two-dimensional motion.
                </ListItem>
                <ListItem
                  title="Monitors"
                  href="/products?category=monitors"
                  icon={<IconDeviceDesktop className="w-5 h-5" />}
                  className="h-[100px]"
                >
                  A computer monitor is an output device that displays
                  information in pictorial form.
                </ListItem>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <ListItem
                  title="Keyboards"
                  href="/products?category=keyboards"
                  icon={<IconKeyboard className="w-5 h-5" />}
                  className="h-[150px]"
                >
                  A keyboard is a typewriter-style device that uses an
                  arrangement of buttons or keys to act as mechanical levers or
                  electronic switches.
                </ListItem>
                <ListItem
                  title="Webcams"
                  href="/products?category=webcams"
                  icon={<IconDeviceComputerCamera className="w-5 h-5" />}
                  className="h-[150px]"
                >
                  Webcam is a video camera that feeds or streams its image in
                  real time to or through a computer to a computer network.
                </ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/configurator" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <IconClipboard className="mr-2 w-5 h-5" />
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
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: JSX.Element;
  }
>(({ className, title, children, icon, ...props }, ref) => {
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
          <div className="text-sm font-medium leading-none flex gap-x-px items-center">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
