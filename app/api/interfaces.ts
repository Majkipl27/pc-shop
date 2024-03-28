interface filtersInterface {
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  take?: number;
  date?: "asc" | "desc";
  price?: "asc" | "desc";
}

export type { filtersInterface };
