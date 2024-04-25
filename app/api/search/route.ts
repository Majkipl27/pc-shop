import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("searchQuery");

    if (!searchQuery) {
      return NextResponse.json(
        { error: "Provide search query!" },
        { status: 400 }
      );
    }

    const data = await prisma.products.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            webcam: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            monitor: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            keyboard: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            mouse: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            headset: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            hardDrive: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            cpuCooling: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            powerSupply: {
              name: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            case: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            gpu: {
              name: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            memory: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            cpu: {
              manufacturer: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            motherboard: {
              name: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        webcam: true,
        monitor: true,
        keyboard: true,
        mouse: true,
        headset: true,
        hardDrive: true,
        cpuCooling: true,
        powerSupply: true,
        case: true,
        gpu: true,
        memory: true,
        cpu: true,
        motherboard: true,
      },
      take: 10,
    });

    const gruppedData = data.reduce((acc: any, curr: any) => {
      for (const key in curr) {
        if (curr[key]) {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(curr[key]);
        }
      }
      return acc;
    }, {});

    Object.keys(gruppedData).forEach((key) => {
      switch (key) {
        case "webcam":
          gruppedData["webcams"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "monitor":
          gruppedData["monitors"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "keyboard":
          gruppedData["keyboards"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "mouse":
          gruppedData["mice"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "headset":
          gruppedData["headsets"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "hardDrive":
          gruppedData["storage"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "cpuCooling":
          gruppedData["cooling"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "powerSupply":
          gruppedData["power-supply"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "case":
          gruppedData["cases"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "gpu":
          gruppedData["gpus"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "memory":
          gruppedData["memory"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "cpu":
          gruppedData["cpus"] = gruppedData[key];
          delete gruppedData[key];
          break;
        case "motherboard":
          gruppedData["motherboards"] = gruppedData[key];
          delete gruppedData[key];
          break;
        default:
          break;
      }
    });

    return NextResponse.json({
      status: 200,
      body: {
        data: gruppedData,
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
