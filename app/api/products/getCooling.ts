import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getCpuCoolings(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const rpm = searchParams.get("rpm") || 0;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const size = searchParams.get("size") || 1000;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const cpuCoolings = await prisma.cpuCooling.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      rpm: {
        gte: +rpm,
      },
      color: {
        in: color,
      },
      size: {
        lte: +size,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
    orderBy: {
      price: filters.price,
      createdAt: filters.date,
    },
  });

  const totalLength = await prisma.cpuCooling.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      rpm: {
        gte: +rpm,
      },
      color: {
        in: color,
      },
      size: {
        lte: +size,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { cpuCoolings, totalLength };
}

export async function getCpuCoolingsOptions() {
  const allCpuCoolings = await prisma.cpuCooling.findMany();

  let possibleOptions: any = {
    color: new Set(),
    manufacturer: new Set(),
  };

  allCpuCoolings.forEach((cc) => {
    for (const [key, value] of Object.entries(cc)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.rpm = "gte";
  possibleOptions.size = "lte";

  return possibleOptions;
}
