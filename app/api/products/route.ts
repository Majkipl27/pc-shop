import { NextResponse } from "next/server";
import {
  getCases,
  getCpuCooling,
  getCpus,
  getGpus,
  getHardDrives,
  getHeadsets,
  getKeyboards,
  getMemory,
  getMice,
  getMonitors,
  getMotherboards,
  getPowerSupplies,
} from "./getProducts";
import { filtersInterface } from "../interfaces";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const minPrice = url.searchParams.get("minPrice") || 0;
    const maxPrice = url.searchParams.get("maxPrice") || 1000000;
    const skip = url.searchParams.get("skip") || 0;
    const take = url.searchParams.get("take") || 10;
    const date = url.searchParams.get("date") || null;
    const price = url.searchParams.get("price") || null;

    if (!category) {
      return NextResponse.json({ error: "Provide category!" }, { status: 400 });
    }

    const filters: filtersInterface = {
      minPrice: +minPrice,
      maxPrice: +maxPrice,
      skip: +skip,
      take: +take,
      date: date as "asc" | "desc" | null,
      price: price as "asc" | "desc" | null,
    };

    let data: unknown;

    switch (category) {
      case "motherboards":
        data = await getMotherboards(filters);
        break;
      case "cpus":
        data = await getCpus(filters);
        break;
      case "memory":
        data = await getMemory(filters);
        break;
      case "gpus":
        data = await getGpus(filters);
        break;
      case "cases":
        data = await getCases(filters);
        break;
      case "power-supply":
        data = await getPowerSupplies(filters);
        break;
      case "cooling":
        data = getCpuCooling(filters);
        break;
      case "storage":
        data = getHardDrives(filters);
        break;
      case "headsets":
        data = getHeadsets(filters);
        break;
      case "mouses":
        data = getMice(filters);
        break;
      case "keyboards":
        data = getKeyboards(filters);
        break;
      case "monitors":
        data = getMonitors(filters);
        break;
      case "webcams":
        data = getMonitors(filters);
        break;
    }

    return NextResponse.json({
      status: 200,
      body: {
        category,
        data,
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
