import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getCpus(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const coreCount = searchParams.get("core_count") || 0;
  const coreClock = searchParams.get("core_clock") || 0;
  const boostClock = searchParams.get("boost_clock") || 0;
  const maxTdp = searchParams.get("tdp") || 1000;
  const graphics =
    searchParams.getAll("graphics").length > 0
      ? searchParams.getAll("graphics")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const cpus = await prisma.cpu.findMany({
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
      ],
      core_count: {
        gte: +coreCount,
      },
      core_clock: {
        gte: +coreClock,
      },
      tdp: {
        lte: +maxTdp,
      },
      graphics: {
        in: graphics,
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

  const totalLength = await prisma.cpu.count({
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
      ],
      core_count: {
        gte: +coreCount,
      },
      core_clock: {
        gte: +coreClock,
      },
      tdp: {
        lte: +maxTdp,
      },
      graphics: {
        in: graphics,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { cpus, totalLength };
}

export async function getCpusOptions() {
  const allCpus = await prisma.cpu.findMany();

  let possibleOptions: any = {
    graphics: new Set<string>(),
    manufacturer: new Set<string>(),
  };

  allCpus.forEach((c) => {
    for (const [key, value] of Object.entries(c)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.max_tdp = possibleOptions.tdp;
  delete possibleOptions.tdp;
  possibleOptions.core_count = "gte";
  possibleOptions.core_clock = "gte";
  possibleOptions.boost_clock = "gte";
  possibleOptions.tdp = "lte";

  return possibleOptions;
}
