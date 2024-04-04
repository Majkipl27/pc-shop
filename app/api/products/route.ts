import { NextResponse } from "next/server";
import { filtersInterface } from "../interfaces";
import { getMotherboards } from "./getMotherboards";
import { getCases } from "./getCases";
import { getCpus } from "./getCpus";
import { getMemory } from "./getMemory";
import { getGpus } from "./getGpus";
import { getPowerSupplies } from "./getPowerSupplies";
import { getCpuCoolings } from "./getCooling";
import { getHardDrives } from "./getHardDrives";
import { getHeadsets } from "./getHeadsets";
import { getMice } from "./getMice";
import { getKeyboards } from "./getKeyboards";
import { getMonitors } from "./getMonitors";
import { getWebcams } from "./getWebcams";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const minPrice = url.searchParams.get("minPrice") || undefined;
    const maxPrice = url.searchParams.get("maxPrice") || undefined;
    const skip = url.searchParams.get("skip") || 0;
    const take = url.searchParams.get("take") || 10;
    const date = url.searchParams.get("date") || undefined;
    const price = url.searchParams.get("price") || undefined;

    if (!category) {
      return NextResponse.json({ error: "Provide category!" }, { status: 400 });
    }

    const filters: filtersInterface = {
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
      skip: +skip,
      take: +take,
      date: date ? (date as "asc" | "desc") : undefined,
      price: price ? (price as "asc" | "desc") : undefined,
    };

    let data: unknown = [];
    let totalLength: number = 0;

    switch (category) {
      case "motherboards":
        const motherboardsData = await getMotherboards(
          filters,
          url.searchParams
        );
        data = motherboardsData.motherboards;
        totalLength = motherboardsData.totalLength;
        break;
      case "cpus":
        const cpusData = await getCpus(filters, url.searchParams);
        data = cpusData.cpus;
        totalLength = cpusData.totalLength;
        break;
      case "memory":
        const memoryData = await getMemory(filters, url.searchParams);
        data = memoryData.memory;
        totalLength = memoryData.totalLength;
        break;
      case "gpus":
        const gpusData = await getGpus(filters, url.searchParams);
        data = gpusData.gpus;
        totalLength = gpusData.totalLength;
        break;
      case "cases":
        const casesData = await getCases(filters, url.searchParams);
        data = casesData.cases;
        totalLength = casesData.totalLength;
        break;
      case "power-supply":
        const powerSupplyData = await getPowerSupplies(
          filters,
          url.searchParams
        );
        data = powerSupplyData.powerSupplies;
        totalLength = powerSupplyData.totalLength;
        break;
      case "cooling":
        const cpuCoolingData = await getCpuCoolings(filters, url.searchParams);
        data = cpuCoolingData.cpuCoolings;
        totalLength = cpuCoolingData.totalLength;
        break;
      case "storage":
        const hardDrivesData = await getHardDrives(filters, url.searchParams);
        data = hardDrivesData.hardDrives;
        totalLength = hardDrivesData.totalLength;
        break;
      case "headsets":
        const headsetsData = await getHeadsets(filters, url.searchParams);
        data = headsetsData.headsets;
        totalLength = headsetsData.totalLength;
        break;
      case "mice":
        const miceData = await getMice(filters, url.searchParams);
        data = miceData.mice;
        totalLength = miceData.totalLength;
        break;
      case "keyboards":
        const keyboardsData = await getKeyboards(filters, url.searchParams);
        data = keyboardsData.keyboards;
        totalLength = keyboardsData.totalLength;
        break;
      case "monitors":
        const monitorsData = await getMonitors(filters, url.searchParams);
        data = monitorsData.monitors;
        totalLength = monitorsData.totalLength;
        break;
      case "webcams":
        const webcamsData = await getWebcams(filters, url.searchParams);
        data = webcamsData.webcams;
        totalLength = webcamsData.totalLength;
        break;
    }

    return NextResponse.json({
      status: 200,
      body: {
        category,
        data,
        totalLength,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
