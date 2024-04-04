import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getMonitors(
  filters: filtersInterface,
  searchParams: URLSearchParams
) {
  const screen_size = searchParams.get("screen_size") || 0;
  const resolution =
    searchParams.getAll("resolution").length > 0
      ? searchParams.getAll("resolution")
      : undefined;
  const refresh_rate = searchParams.get("refresh_rate") || 0;
  const response_time = searchParams.get("response_time") || 1000;
  const panel_type =
    searchParams.getAll("panel_type").length > 0
      ? searchParams.getAll("panel_type")
      : undefined;
  const aspect_ratio =
    searchParams.getAll("aspect_ratio").length > 0
      ? searchParams.getAll("aspect_ratio")
      : undefined;
  const manufacturer =
    searchParams.getAll("manufacturer").length > 0
      ? searchParams.getAll("manufacturer")
      : undefined;

  const monitors = await prisma.monitor.findMany({
    take: filters.take,
    skip: filters.skip,
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      screen_size: {
        gte: +screen_size,
      },
      resolution: {
        in: resolution,
      },
      refresh_rate: {
        gte: +refresh_rate,
      },
      response_time: {
        lte: +response_time,
      },
      panel_type: {
        in: panel_type,
      },
      aspect_ratio: {
        in: aspect_ratio,
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

  const totalLength = await prisma.monitor.count({
    where: {
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      screen_size: {
        gte: +screen_size,
      },
      resolution: {
        in: resolution,
      },
      refresh_rate: {
        gte: +refresh_rate,
      },
      response_time: {
        lte: +response_time,
      },
      panel_type: {
        in: panel_type,
      },
      aspect_ratio: {
        in: aspect_ratio,
      },
      manufacturer: {
        in: manufacturer,
      },
    },
  });

  return { monitors, totalLength };
}

export async function getMonitorsOptions() {
  const allMonitors = await prisma.monitor.findMany();

  let possibleOptions: any = {
    resolution: new Set<string>(),
    panel_type: new Set<string>(),
    aspect_ratio: new Set<string>(),
    manufacturer: new Set<string>(),
  };

  allMonitors.forEach((m) => {
    for (const [key, value] of Object.entries(m)) {
      possibleOptions[key] && value && possibleOptions[key].add(value);
    }
  });

  for (const [key, value] of Object.entries(possibleOptions)) {
    possibleOptions[key] = [...(value as (typeof possibleOptions)[typeof key])];
  }

  possibleOptions.screen_size = "gte";
  possibleOptions.refresh_rate = "gte";
  possibleOptions.response_time = "lte";

  return possibleOptions;
}
