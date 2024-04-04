import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getKeyboards(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const style =
    searchParams.getAll("style").length > 0
      ? searchParams.getAll("style")
      : undefined;
  const switches =
    searchParams.getAll("switches").length > 0
      ? searchParams.getAll("switches")
      : undefined;
  const backlit =
    searchParams.getAll("backlit").length > 0
      ? searchParams.getAll("backlit")
      : undefined;
  const tenkeyless = searchParams.get("tenkeyless") || undefined;
  const connection_type =
    searchParams.getAll("connection_type").length > 0
      ? searchParams.getAll("connection_type")
      : undefined;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const keyboards = await prisma.keyboard.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      style: {
        in: style,
      },
      switches: {
        in: switches,
      },
      backlit: {
        in: backlit,
      },
      tenkeyless: {
        equals:
          tenkeyless === "true"
            ? true
            : tenkeyless === "false"
            ? false
            : undefined,
      },
      connection_type: {
        in: connection_type,
      },
      color: {
        in: color,
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

  const totalLength = await prisma.keyboard.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      style: {
        in: style,
      },
      switches: {
        in: switches,
      },
      backlit: {
        in: backlit,
      },
      tenkeyless: {
        equals:
          tenkeyless === "true"
            ? true
            : tenkeyless === "false"
            ? false
            : undefined,
      },
      connection_type: {
        in: connection_type,
      },
      color: {
        in: color,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { keyboards, totalLength };
}

export async function getKeyboardsOptions() {
  const allKeyboards = await prisma.keyboard.findMany();

  let possibleOptions: any = {
    style: new Set<string>(),
    switches: new Set<string>(),
    backlit: new Set<string>(),
    connection_type: new Set<string>(),
    color: new Set<string>(),
    manufacturer: new Set<string>(),
  };

  allKeyboards.forEach((k) => {
    for (const [key, value] of Object.entries(k)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.tenkeyless = "boolean";

  return possibleOptions;
}
