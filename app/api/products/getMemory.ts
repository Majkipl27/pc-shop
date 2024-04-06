import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getMemory(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const speed = searchParams.get("speed") || 0;
  const modules =
    searchParams.getAll("modules").length > 0
      ? searchParams.getAll("modules")
      : undefined;
  const pricePerGb = searchParams.get("price_per_gb") || 10000;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const firstWordLatency = searchParams.get("first_word_latency") || 10000;
  const casLatency = searchParams.get("cas_latency") || 10000;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const memory = await prisma.memory.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      OR: [
        {
          price_per_gb: {
            gte: filters.minPrice,
            lte: filters.maxPrice,
          },
        },
        {
          price_per_gb: {
            equals: null,
          },
        },
      ],
      speed: {
        gte: +speed,
      },
      modules: {
        in: modules?.map((m) => +m),
      },
      color: {
        in: color,
      },
      first_word_latency: {
        lte: +firstWordLatency,
      },
      cas_latency: {
        lte: +casLatency,
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

  const totalLength = await prisma.memory.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      speed: {
        gte: +speed,
      },
      modules: {
        in: modules?.map((m) => +m),
      },
      price_per_gb: {
        lte: +pricePerGb,
      },
      color: {
        in: color,
      },
      first_word_latency: {
        lte: +firstWordLatency,
      },
      cas_latency: {
        lte: +casLatency,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { memory, totalLength };
}

export async function getMemoryOptions() {
  const allMemory = await prisma.memory.findMany();

  let possibleOptions: any = {
    modules: new Set(),
    color: new Set(),
    manufacturer: new Set(),
  };

  allMemory.forEach((m) => {
    for (const [key, value] of Object.entries(m)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.speed = "gte";
  possibleOptions.price_per_gb = "lte";
  possibleOptions.first_word_latency = "lte";
  possibleOptions.cas_latency = "lte";

  return possibleOptions;
}
