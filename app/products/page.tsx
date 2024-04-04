"use client";
import FiltersComponent from "@components/filtersComponent";
import PaginationComponent from "@components/paginationComponent";
import ProductsMap from "@components/productsMap";
import SortByComponent from "@components/sortByComponent";
import { toast } from "@components/ui/use-toast";
import { products } from "@lib/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<products>({
    category: "",
    data: [],
  });
  const [totalLength, setTotalLength] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("?");
  const [possibleOptions, setPossibleOptions] = useState<{
    [key: string]: string[] | string;
  }>({});
  const [areProductsBeingFetched, setAreProductsBeingFetched] =
    useState<boolean>(true);
  const [areFiltersBeingFetched, setAreFiltersBeingFetched] =
    useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const url = params.toString();
  const category = params.get("category");

  async function fetchProducts(): Promise<void> {
    setAreProductsBeingFetched(true);
    try {
      const req = await fetch(`/api/products?${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await req.json();
      if (res.status !== 200) {
        throw new Error("Failed to fetch data.");
      } else {
        setProducts({ category: res.body.category, data: res.body.data });
        setTotalLength(res.body.totalLength);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch data.",
      });
    }
    setAreProductsBeingFetched(false);
  }

  async function fetchPossibleOptions(): Promise<void> {
    setAreFiltersBeingFetched(true);
    try {
      const req = await fetch(
        `/api/products/possible-options?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const res = await req.json();
      if (res.status !== 200) {
        throw new Error("Failed to fetch possible options.");
      } else {
        setPossibleOptions(res.body.data);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch possible options.",
      });
    }
    setAreFiltersBeingFetched(false);
  }

  function updateSearchParams(key: string, value: string): void {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value);
    router.push(pathname + "?" + newParams.toString());
  }

  function updateFilters(options: {
    key: string;
    data: string | string[] | number | boolean;
  }): void {
    const newParams = new URLSearchParams(params.toString());
    if (Array.isArray(options.data)) {
      newParams.delete(options.key);
      options.data.forEach((p: string) => {
        newParams.append(options.key, p);
      });
    } else {
      if (options.data === "" || options.data === "0")
        newParams.delete(options.key);
      else newParams.set(options.key, options.data.toString());
    }
    router.push(pathname + "?" + newParams.toString());
  }

  useEffect(() => {
    fetchProducts();
    fetchPossibleOptions();
    const priceParam = params.get("price");
    const dateParam = params.get("date");
    if (priceParam) {
      setSortBy(
        priceParam === "asc"
          ? "Price (asc)"
          : priceParam === "desc"
          ? "Price (desc)"
          : "?"
      );
    } else if (dateParam) {
      setSortBy(
        dateParam === "asc" ? "Oldest" : dateParam === "desc" ? "Newest" : "?"
      );
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [url]);

  function checkSearchParams(): void {
    const newParams = new URLSearchParams(params.toString());
    const takeParam = params.get("take");
    const skipParam = params.get("skip");
    if (takeParam) {
      setTake(+takeParam);
    } else {
      newParams.set("take", take.toString());
    }
    if (skipParam) {
      setSkip(+skipParam);
    } else {
      newParams.set("skip", skip.toString());
    }

    router.push(pathname + "?" + newParams.toString());
  }

  useEffect(() => {
    checkSearchParams();
  }, [url]);

  useEffect(() => {
    const newParams = new URLSearchParams(params.toString());
    if (sortBy === "?") {
      return;
    } else if (sortBy === "Newest" || sortBy === "Oldest") {
      newParams.set("date", sortBy === "Newest" ? "desc" : "asc");
      newParams.delete("price");
    } else {
      newParams.set("price", sortBy === "Price (asc)" ? "asc" : "desc");
      newParams.delete("date");
    }
    router.push(pathname + "?" + newParams.toString());
    fetchProducts();
  }, [sortBy]);

  return (
    <div className="flex items-center justify-around h-screen flex-col pb-12 pt-24 space-y-4">
      <ProductsMap products={products} isLoading={areProductsBeingFetched} />
      <div className="flex justify-center items-center pt-2 border-t w-full space-x-4">
        <PaginationComponent
          skip={skip}
          take={take}
          updateSearchParams={updateSearchParams}
          totalLength={totalLength}
          setTake={setTake}
        />
        <SortByComponent sortBy={sortBy} setSortBy={setSortBy} />
        <FiltersComponent
          possibleOptions={possibleOptions}
          updateFilters={updateFilters}
          areFiltersBeingFetched={areFiltersBeingFetched}
        />
      </div>
    </div>
  );
}
