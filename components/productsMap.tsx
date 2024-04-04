"use client";
import {
  computerCase,
  cpu,
  cpuCooling,
  gpu,
  hardDrive,
  headset,
  keyboard,
  memory,
  monitor,
  motherboard,
  mouse,
  powerSupply,
  products,
  webcam,
} from "@lib/interfaces";
import Motherboards from "./products/Motherboards";
import Cpus from "./products/Cpus";
import Memory from "./products/Memory";
import Gpus from "./products/Gpus";
import Cases from "./products/Cases";
import PowerSupplies from "./products/PowerSupplies";
import CpuCooling from "./products/CpuCooling";
import HardDrives from "./products/HardDrives";
import Headsets from "./products/Headsets";
import Keyboards from "./products/Keyboards";
import Mice from "./products/Mice";
import Monitors from "./products/Monitors";
import Webcams from "./products/Webcams";
import Spinner from "./spinner";

export default function ProductsMap({
  products,
  isLoading,
}: {
  products: products;
  isLoading: boolean;
}): JSX.Element {
  const category = products.category;

  if (isLoading) {
    return <Spinner classname="h-full"/>;
  }

  switch (category) {
    case "motherboards":
      return <Motherboards data={products.data as motherboard[]} />;
    case "cpus":
      return <Cpus data={products.data as cpu[]} />;
    case "memory":
      return <Memory data={products.data as memory[]} />;
    case "gpus":
      return <Gpus data={products.data as gpu[]} />;
    case "cases":
      return <Cases data={products.data as computerCase[]} />;
    case "power-supply":
      return <PowerSupplies data={products.data as powerSupply[]} />;
    case "cpu-cooling":
      return <CpuCooling data={products.data as cpuCooling[]} />;
    case "hard-drives":
      return <HardDrives data={products.data as hardDrive[]} />;
    case "headsets":
      return <Headsets data={products.data as headset[]} />;
    case "keyboards":
      return <Keyboards data={products.data as keyboard[]} />;
    case "mice":
      return <Mice data={products.data as mouse[]} />;
    case "monitors":
      return <Monitors data={products.data as monitor[]} />;
    case "webcams":
      return <Webcams data={products.data as webcam[]} />;
    default:
      return <div>{products.category}</div>;
  }
}
