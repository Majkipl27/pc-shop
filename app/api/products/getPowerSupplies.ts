import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getPowerSupplies(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const type =
    searchParams.getAll("type").length > 0
      ? searchParams.getAll("type")
      : undefined;
  const efficiency_rating =
    searchParams.getAll("efficiency_rating").length > 0
      ? searchParams.getAll("efficiency_rating")
      : undefined;
  const wattage = searchParams.get("wattage") || 0;
  const modular =
    searchParams.getAll("modular").length > 0
      ? searchParams.getAll("modular")
      : undefined;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const powerSupplies = await prisma.powerSupply.findMany({
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
      efficiency_rating: {
        in: efficiency_rating,
      },
      wattage: {
        gte: +wattage,
      },
      modular: {
        in: modular,
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

  const totalLength = await prisma.powerSupply.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      type: {
        in: type,
      },
      efficiency_rating: {
        in: efficiency_rating,
      },
      wattage: {
        gte: +wattage,
      },
      modular: {
        in: modular,
      },
      color: {
        in: color,
      },
      name: {
        in: manufacturer,
      },
    },
  });

  return { powerSupplies, totalLength };
}

export async function getPowerSuppliesOptions() {
  const allPowerSupplies = await prisma.powerSupply.findMany();

  let possibleOptions: any = {
    type: new Set(),
    efficiency_rating: new Set(),
    modular: new Set(),
    color: new Set(),
    name: new Set(),
  };

  allPowerSupplies.forEach((ps) => {
    for (const [key, value] of Object.entries(ps)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.manufacturer = possibleOptions.name;
  delete possibleOptions.name;
  possibleOptions.wattage = "gte";

  return possibleOptions;
}
