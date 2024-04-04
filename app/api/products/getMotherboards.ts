import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getMotherboards(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const socket =
    searchParams.getAll("socket").length > 0
      ? searchParams.getAll("socket")
      : undefined;
  const formFactor =
    searchParams.getAll("form_factor").length > 0
      ? searchParams.getAll("form_factor")
      : undefined;
  const maxMemory = searchParams.get("max_memory") || 0;
  const memorySlots =
    searchParams.getAll("memory_slots").length > 0
      ? searchParams.getAll("memory_slots").map((slot) => +slot)
      : undefined;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams
          .getAll("color")
          .map((cl) => cl.charAt(0).toUpperCase() + cl.slice(1))
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const motherboards = await prisma.motherboard.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      socket: {
        in: socket,
      },
      form_factor: {
        in: formFactor,
      },
      max_memory: {
        gte: +maxMemory,
      },
      memory_slots: {
        in: memorySlots,
      },
      color: {
        in: color,
      },
      name: {
        in: manufacturer,
      },
    },
    orderBy: {
      price: filters.price,
      createdAt: filters.date,
    },
  });

  const totalLength = await prisma.motherboard.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      socket: {
        in: socket,
      },
      form_factor: {
        in: formFactor,
      },
      max_memory: {
        gte: +maxMemory,
      },
      memory_slots: {
        in: memorySlots,
      },
      color: {
        in: color,
      },
      name: {
        in: manufacturer,
      },
    },
  });

  return { motherboards, totalLength };
}

export async function getMotherboardsOptions() {
  const allMotherboards = await prisma.motherboard.findMany();

  let possibleOptions: any = {
    socket: new Set<string>(),
    form_factor: new Set<string>(),
    memory_slots: new Set<number>(),
    color: new Set<string>(),
    name: new Set<string>(),
  };

  allMotherboards.forEach((m) => {
    for (const [key, value] of Object.entries(m)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.max_memory = "gte";
  possibleOptions.manufacturer = possibleOptions.name;
  delete possibleOptions.name;

  return possibleOptions;
}
