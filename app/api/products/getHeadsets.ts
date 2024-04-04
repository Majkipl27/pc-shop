import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getHeadsets(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const type =
    searchParams.getAll("type").length > 0
      ? searchParams.getAll("type")
      : undefined;
  const microphone = searchParams.get("microphone") || undefined;
  const wireless = searchParams.get("wireless") || undefined;
  const enclosure_type =
    searchParams.getAll("enclosure_type").length > 0
      ? searchParams.getAll("enclosure_type")
      : undefined;
  const color =
    searchParams.getAll("color").length > 0
      ? searchParams.getAll("color")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const headsets = await prisma.headset.findMany({
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
      microphone: {
        equals:
          microphone === "true"
            ? true
            : microphone === "false"
            ? false
            : undefined,
      },
      wireless: {
        equals:
          wireless === "true" ? true : wireless === "false" ? false : undefined,
      },
      enclosure_type: {
        in: enclosure_type,
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

  const totalLength = await prisma.headset.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      type: {
        in: type,
      },
      microphone: {
        equals:
          microphone === "true"
            ? true
            : microphone === "false"
            ? false
            : undefined,
      },
      wireless: {
        equals:
          wireless === "true" ? true : wireless === "false" ? false : undefined,
      },
      enclosure_type: {
        in: enclosure_type,
      },
      color: {
        in: color,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { headsets, totalLength };
}

export async function getHeadsetsOptions() {
  const allHeadsets = await prisma.headset.findMany();

  let possibleOptions: any = {
    type: new Set<string>(),
    enclosure_type: new Set<string>(),
    color: new Set<string>(),
    manufacturer: new Set<string>(),
  };

  allHeadsets.forEach((hs) => {
    for (const [key, value] of Object.entries(hs)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.wireless = "boolean";
  possibleOptions.microphone = "boolean";

  return possibleOptions;
}
