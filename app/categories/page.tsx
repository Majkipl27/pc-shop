import { HoverEffect } from "@components/ui/card-hover-effect";

export default function CategoriesPage(): JSX.Element {
  const items: {
    title: string;
    description: string;
    link: string;
    image?: string;
  }[] = [
    {
      title: "Motherboards",
      link: "/products?category=motherboards",
      description:
        "Motherboards are the main printed circuit board within a computer.",
      image: "https://cdn-icons-png.flaticon.com/512/2764/2764211.png",
    },
    {
      title: "Cpu's",
      link: "/products?category=cpus",
      description:
        "Cpu is the component of a computer that acts as its “control center”.",
      image: "https://cdn-icons-png.flaticon.com/512/984/984442.png",
    },
    {
      title: "Graphics cards",
      link: "/products?category=gpus",
      description:
        "A graphics processing unit (GPU) is a specialized processor originally designed to accelerate graphics rendering",
      image:
        "https://www.shutterstock.com/shutterstock/videos/1074222746/thumb/7.jpg?ip=x480",
    },
    {
      title: "Memory",
      link: "/products?category=memory",
      description:
        "RAM is a computer's short-term memory, where the data that the processor is currently using is stored.",
      image: "https://cdn-icons-png.flaticon.com/512/2703/2703609.png",
    },
    {
      title: "Storage",
      link: "/products?category=storage",
      description:
        "Storage is the place where data is held for access by a computer processor.",
      image: "https://cdn-icons-png.flaticon.com/512/4275/4275232.png",
    },
    {
      title: "Power supply",
      link: "/products?category=power-supply",
      description:
        "A power supply is an electrical device that supplies electric power.",
      image: "https://cdn-icons-png.flaticon.com/512/2029/2029192.png",
    },
    {
      title: "Cases",
      link: "/products?category=cases",
      description:
        "A computer case, enclosure that contains most of the components.",
      image: "https://cdn-icons-png.flaticon.com/512/3103/3103969.png",
    },
    {
      title: "Cpu cooling",
      link: "/products?category=cooling",
      description: "CPU cooling is device, that cools your cpu.",
      image: "https://cdn-icons-png.flaticon.com/512/689/689291.png",
    },
    {
      title: "Headsets",
      link: "/products?category=headsets",
      description: "A headset combines a headphone with a microphone.",
      image: "https://cdn-icons-png.flaticon.com/512/543/543227.png",
    },
    {
      title: "Mice",
      link: "/products?category=mice",
      description:
        "A computer mouse is a hand-held pointing device that detects two-dimensional motion.",
      image: "https://cdn-icons-png.flaticon.com/512/1787/1787045.png",
    },
    {
      title: "Monitors",
      link: "/products?category=monitors",
      description:
        "A computer monitor is an output device that displays information in pictorial form.",
      image: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
    },
    {
      title: "Keyboards",
      link: "/products?category=keyboards",
      description:
        "A keyboard is a typewriter-style device that uses an arrangement of buttons or keys to act as mechanical levers or electronic switches.",
      image: "https://cdn-icons-png.flaticon.com/512/2218/2218280.png",
    },
    {
      title: "Webcams",
      link: "/products?category=webcams",
      description:
        "Webcam is a video camera that feeds or streams its image in real time to or through a computer to a computer network.",
      image: "https://cdn-icons-png.flaticon.com/512/3037/3037951.png",
    },
  ];

  return (
    <div className="bg-grid-slate-100 dark:bg-grid-slate-900 w-screen flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl font-poppins font-semibold">Categories</h2>
      <HoverEffect items={items} className="w-2/3" />
    </div>
  );
}
