import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getMice(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const tracking_method =
    searchParams.getAll("tracking_method").length > 0
      ? searchParams.getAll("tracking_method")
      : undefined;
  const connection_type =
    searchParams.getAll("connection_type").length > 0
      ? searchParams.getAll("connection_type")
      : undefined;
  const hand_orientation =
    searchParams.getAll("hand_orientation").length > 0
      ? searchParams.getAll("hand_orientation")
      : undefined;
  const max_dpi = searchParams.get("max_dpi") || 100000;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const mice = await prisma.mouse.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      tracking_method: {
        in: tracking_method,
      },
      connection_type: {
        in: connection_type,
      },
      hand_orientation: {
        in: hand_orientation,
      },
      max_dpi: {
        lte: +max_dpi,
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

  const totalLength = await prisma.mouse.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      tracking_method: {
        in: tracking_method,
      },
      connection_type: {
        in: connection_type,
      },
      hand_orientation: {
        in: hand_orientation,
      },
      max_dpi: {
        lte: +max_dpi,
      },
      color: {
        in: color,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { mice, totalLength };
}

export async function getMiceOptions() {
  const allMice = await prisma.mouse.findMany();

  let possibleOptions: any = {
    tracking_method: new Set(),
    connection_type: new Set(),
    hand_orientation: new Set(),
    color: new Set(),
    manufacturer: new Set(),
  };

  allMice.forEach((m) => {
    for (const [key, value] of Object.entries(m)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.max_dpi = "lte";

  return possibleOptions;
}
