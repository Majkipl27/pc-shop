import prisma from "@lib/prisma";
import { filtersInterface } from "../interfaces";

export async function getMotherboards(filters?: filtersInterface) {
  const motherboards = await prisma.motherboard.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return motherboards;
}

export async function getCpus(filters?: filtersInterface) {
  const cpus = await prisma.cpu.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return cpus;
}

export async function getMemory(filters?: filtersInterface) {
  const memory = await prisma.memory.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return memory;
}

export async function getGpus(filters?: filtersInterface) {
  const gpus = await prisma.gpu.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return gpus;
}

export async function getCases(filters?: filtersInterface) {
  const cases = await prisma.case.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return cases;
}

export async function getPowerSupplies(filters?: filtersInterface) {
  const powerSupplies = await prisma.powerSupply.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return powerSupplies;
}

export async function getCpuCooling(filters?: filtersInterface) {
  const cpuCooling = await prisma.cpuCooling.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return cpuCooling;
}

export async function getHardDrives(filters?: filtersInterface) {
  const hardDrives = await prisma.hardDrive.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return hardDrives;
}

export async function getHeadsets(filters?: filtersInterface) {
  const headsets = await prisma.headset.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return headsets;
}

export async function getMice(filters?: filtersInterface) {
  const mice = await prisma.mouse.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return mice;
}

export async function getKeyboards(filters?: filtersInterface) {
  const keyboards = await prisma.keyboard.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return keyboards;
}

export async function getMonitors(filters?: filtersInterface) {
  const monitors = await prisma.monitor.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return monitors;
}

export async function getWebcams(filters?: filtersInterface) {
  const webcams = await prisma.webcam.findMany({
    take: filters?.take || 10,
    skip: filters?.skip || 0,
    where: {
      price: {
        gte: filters?.minPrice || 0,
        lte: filters?.maxPrice || 1000000,
      },
    },
    orderBy: {
      price: filters?.price || undefined,
      createdAt: filters?.date || undefined,
    },
  });

  return webcams;
}
