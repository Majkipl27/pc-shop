import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getGpus(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const chipset =
    searchParams.getAll("chipset").length > 0
      ? searchParams.getAll("chipset")
      : undefined;
  const memory = searchParams.get("memory") || 0;
  const coreClock = searchParams.get("core_clock") || 0;
  const boostClock = searchParams.get("boost_clock") || 0;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;
  const length = searchParams.get("length") || 0;

  const gpus = await prisma.gpu.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      OR: [
        {
          boost_clock: {
            gte: +boostClock,
          },
        },
        {
          boost_clock: {
            equals: null,
          },
        },
        {
          length: {
            lte: +length,
          },
        },
        {
          length: {
            equals: null,
          },
        },
      ],
      chipset: {
        in: chipset,
      },
      memory: {
        gte: +memory,
      },
      core_clock: {
        gte: +coreClock,
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

  const totalLength = await prisma.gpu.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      OR: [
        {
          boost_clock: {
            gte: +boostClock,
          },
        },
        {
          boost_clock: {
            equals: null,
          },
        },
        {
          length: {
            lte: +length,
          },
        },
        {
          length: {
            equals: null,
          },
        },
      ],
      chipset: {
        in: chipset,
      },
      memory: {
        gte: +memory,
      },
      core_clock: {
        gte: +coreClock,
      },
      color: {
        in: color,
      },
      name: {
        in: manufacturer,
      },
    },
  });

  return { gpus, totalLength };
}

export async function getGpusOptions() {
  const allGpus = await prisma.gpu.findMany();

  let possibleOptions: any = {
    chipset: new Set<string>(),
    color: new Set<string>(),
    name: new Set<string>(),
  };

  allGpus.forEach((g) => {
    for (const [key, value] of Object.entries(g)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.manufacturer = possibleOptions.name;
  delete possibleOptions.name;
  possibleOptions.memory = "gte";
  possibleOptions.core_clock = "gte";
  possibleOptions.boost_clock = "gte";
  possibleOptions.length = "lte";

  return possibleOptions;
}
