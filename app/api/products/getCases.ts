import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getCases(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const type =
    searchParams.getAll("type").length > 0
      ? searchParams.getAll("type")
      : undefined;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const psu =
    searchParams.getAll("psu").length > 0
      ? searchParams.getAll("psu")
      : undefined;
  const sidePanel =
    searchParams.getAll("side_panel").length > 0
      ? searchParams.getAll("side_panel")
      : undefined;
  const externalVolume = searchParams.get("external_volume") || 0;
  const internal35Bays = searchParams.get("internal35Bays") || 0;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const cases = await prisma.case.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      type: {
        in: type,
      },
      color: {
        in: color,
      },
      psu: {
        in: psu,
      },
      side_panel: {
        in: sidePanel,
      },
      external_volume: {
        gte: +externalVolume,
      },
      internal_35_bays: {
        gte: +internal35Bays,
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

  const totalLength = await prisma.case.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      type: {
        in: type,
      },
      color: {
        in: color,
      },
      psu: {
        in: psu,
      },
      side_panel: {
        in: sidePanel,
      },
      external_volume: {
        gte: +externalVolume,
      },
      internal_35_bays: {
        gte: +internal35Bays,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { cases, totalLength };
}

export async function getCasesOptions() {
  const allCases = await prisma.case.findMany();

  let possibleOptions: any = {
    type: new Set<string>(),
    color: new Set<string>(),
    psu: new Set<string>(),
    side_panel: new Set<string>(),
    manufacturer: new Set<string>(),
  };

  allCases.forEach((c) => {
    for (const [key, value] of Object.entries(c)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.external_volume = "gte";
  possibleOptions.internal_35_bays = "gte";

  return possibleOptions;
}
