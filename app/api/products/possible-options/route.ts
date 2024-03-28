import { NextResponse } from "next/server";
import { getMotherboardsOptions } from "../getMotherboards";
import { getCasesOptions } from "../getCases";
import { getCpusOptions } from "../getCpus";
import { getMemoryOptions } from "../getMemory";
import { getGpusOptions } from "../getGpus";
import { getPowerSuppliesOptions } from "../getPowerSupplies";
import { getCpuCoolingsOptions } from "../getCooling";
import { getHardDrivesOptions } from "../getHardDrives";
import { getHeadsetsOptions } from "../getHeadsets";
import { getMiceOptions } from "../getMice";
import { getKeyboardsOptions } from "../getKeyboards";
import { getMonitorsOptions } from "../getMonitors";
import { getWebcamsOptions } from "../getWebcams";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Provide category!" }, { status: 400 });
    }

    let data: unknown;

    switch (category) {
      case "motherboards":
        data = await getMotherboardsOptions();
        break;
      case "cpus":
        data = await getCpusOptions();
        break;
      case "memory":
        data = await getMemoryOptions();
        break;
      case "gpus":
        data = await getGpusOptions();
        break;
      case "cases":
        data = await getCasesOptions();
        break;
      case "power-supply":
        data = await getPowerSuppliesOptions();
        break;
      case "cooling":
        data = await getCpuCoolingsOptions();
        break;
      case "storage":
        data = await getHardDrivesOptions();
        break;
      case "headsets":
        data = await getHeadsetsOptions();
        break;
      case "mice":
        data = await getMiceOptions();
        break;
      case "keyboards":
        data = await getKeyboardsOptions();
        break;
      case "monitors":
        data = await getMonitorsOptions();
        break;
      case "webcams":
        data = await getWebcamsOptions();
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
