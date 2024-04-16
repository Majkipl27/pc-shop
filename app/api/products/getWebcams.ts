import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getWebcams(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const resolution =
    searchParams.getAll("resolutions").length > 0
      ? searchParams.getAll("resolutions")
      : undefined;
  const connection =
    searchParams.getAll("connection").length > 0
      ? searchParams.getAll("connection")
      : undefined;
  const focus_type =
    searchParams.getAll("focus_type").length > 0
      ? searchParams.getAll("focus_type")
      : undefined;
  const fov =
    searchParams.getAll("fov").length > 0
      ? searchParams.getAll("fov")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const webcams = await prisma.webcam.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      resolutions: {
        in: resolution,
      },
      manufacturer: {
        in: manufacturer,
      },
      connection: {
        in: connection,
      },
      focus_type: {
        in: focus_type,
      },
      fov: {
        in: fov,
      },
    },
    orderBy: {
      price: filters.price,
      createdAt: filters.date,
    },
  });

  const totalLength = await prisma.webcam.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      resolutions: {
        in: resolution,
      },
      manufacturer: {
        in: manufacturer,
      },
      connection: {
        in: connection,
      },
      focus_type: {
        in: focus_type,
      },
      fov: {
        in: fov,
      },
    },
  });

  return { webcams, totalLength };
}

export async function getWebcamsOptions() {
  const allWebcams = await prisma.webcam.findMany();

  let possibleOptions: any = {
    resolutions: new Set<string>(),
    connection: new Set<string>(),
    focus_type: new Set<string>(),
    fov: new Set<string>(),
    manufacturer: new Set<string>(),
  };

  allWebcams.forEach((wc) => {
    for (const [key, value] of Object.entries(wc)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  return possibleOptions;
}

export async function getData() {
  const products = await prisma.products.findMany({
    select: {
      webcam: true,
    },
    where: {
      NOT: {
        webcamId: {
          equals: null,
        },
      }
    },
  });
  return { products, totalLength: products.length };
}
