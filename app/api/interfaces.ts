interface filtersInterface {
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  take?: number;
  date?: "asc" | "desc" | null;
  price?: "asc" | "desc" | null;
}

export type { filtersInterface };
