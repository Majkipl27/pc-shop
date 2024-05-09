interface User {
  id: string;
  email: string;
}

interface motherboard {
  id: string;
  price: number | null;
  socket: string | null;
  form_factor: string | null;
  max_memory: number | null;
  memory_slots: number | null;
  color: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface cpu {
  id: string;
  price: number | null;
  core_count: number | null;
  core_clock: number | null;
  boost_clock: number | null;
  tdp: number | null;
  graphics: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface memory {
  id: string;
  price: number | null;
  speed: number | null;
  modules: number | null;
  price_per_gb: number | null;
  color: string | null;
  first_word_latency: number | null;
  cas_latency: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface gpu {
  id: string;
  price: number | null;
  chipset: string | null;
  memory: number | null;
  core_clock: number | null;
  boost_clock: number | null;
  color: string | null;
  length: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface computerCase {
  id: string;
  price: number | null;
  type: string | null;
  color: string | null;
  psu: string | null;
  side_panel: string | null;
  external_volume: number | null;
  internal_35_bays: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface powerSupply {
  id: string;
  price: number | null;
  type: string | null;
  efficiency_rating: string | null;
  wattage: number | null;
  modular: string | null;
  color: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface cpuCooling {
  id: string;
  price: number | null;
  rpm: number | null;
  color: string | null;
  size: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface hardDrive {
  id: string;
  price: number | null;
  capacity: number | null;
  price_per_gb: number | null;
  type: string | null;
  cache: number | null;
  form_factor: string | null;
  interface: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface headset {
  id: string;
  price: number | null;
  type: string | null;
  microphone: boolean | null;
  wireless: boolean | null;
  enclosure_type: string | null;
  color: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface mouse {
  id: string;
  price: number | null;
  tracking_method: string | null;
  connection_type: string | null;
  max_dpi: number | null;
  hand_orientation: string | null;
  color: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface keyboard {
  id: string;
  price: number | null;
  name: string | null;
  style: string | null;
  switches: string | null;
  backlit: string | null;
  tenkeyless: boolean | null;
  connection_type: string | null;
  color: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
}

interface monitor {
  id: string;
  price: number | null;
  screen_size: number | null;
  resolution: string | null;
  refresh_rate: number | null;
  response_time: number | null;
  panel_type: string | null;
  aspect_ratio: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
  name: string | null;
}

interface webcam {
  id: string;
  price: number | null;
  name: string | null;
  resolutions: string | null;
  connection: string | null;
  focus_type: string | null;
  fov: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  manufacturer: string | null;
}

interface products {
  category: string;
  data: product[];
}

type product =
  | motherboard
  | cpu
  | memory
  | gpu
  | computerCase
  | powerSupply
  | cpuCooling
  | hardDrive
  | headset
  | mouse
  | keyboard
  | monitor
  | webcam;

type cartItem = {
  item: product;
  quantity: number;
  category: string;
};

export type {
  User,
  motherboard,
  cpu,
  memory,
  gpu,
  computerCase,
  powerSupply,
  cpuCooling,
  hardDrive,
  headset,
  mouse,
  keyboard,
  monitor,
  webcam,
  products,
  product,
  cartItem
};
