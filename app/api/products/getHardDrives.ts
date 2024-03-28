import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getHardDrives(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const capacity = searchParams.get("capacity") || 0;
  const price_per_gb = searchParams.get("price_per_gb") || 1000;
  const type =
    searchParams.getAll("type").length > 0
      ? searchParams.getAll("type")
      : undefined;
  const cache = searchParams.get("cache") || 0;
  const form_factor = searchParams.get("form_factor") || undefined;
  const interfaceType = searchParams.get("interface") || undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const hardDrives = await prisma.hardDrive.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      capacity: {
        gte: +capacity,
      },
      price_per_gb: {
        lte: +price_per_gb,
      },
      type: {
        in: type,
      },
      cache: {
        gte: +cache,
      },
      form_factor: {
        equals: form_factor,
      },
      interface: {
        equals: interfaceType,
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

  const totalLength = await prisma.hardDrive.count();

  return { hardDrives, totalLength };
}

export async function getHardDrivesOptions() {
  const allHardDrives = await prisma.hardDrive.findMany();

  let possibleOptions: any = {
    type: new Set(),
    form_factor: new Set(),
    interface: new Set(),
    manufacturer: new Set(),
  };

  allHardDrives.forEach((hd) => {
    for (const [key, value] of Object.entries(hd)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.type = possibleOptions.type.map((type: string) => {
    if (type !== "SSD") {
      return "HDD " + type + " RPM";
    }
    return type;
  });

  possibleOptions.capacity = "gte";
  possibleOptions.price_per_gb = "lte";
  possibleOptions.cache = "gte";

  return possibleOptions;
}
