"use client";

import ProductsMap from "@components/productsMap";
import Spinner from "@components/spinner";
import { toast } from "@components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
  const [items, setItems] = useState<{ [key: string]: any }>({});
  const [areProductsBeingFetched, setAreProductsBeingFetched] =
    useState<boolean>(true);
  const params = useSearchParams();
  const router = useRouter();

  async function fetchItems() {
    setAreProductsBeingFetched(true);
    try {
      const req = await fetch(
        `/api/search?searchQuery=${params.get("searchQuery")}`,
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
        throw new Error("Failed to fetch data.");
      } else {
        setItems(res.body.data);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch data.",
      });
    }
    setAreProductsBeingFetched(false);
  }

  useEffect(() => {
    if (!params.get("searchQuery")) router.push("/");
    fetchItems();
  }, [params]);

  return (
    <div className="flex items-center overflow-y-auto flex-col py-24 gap-8 bg-dot-slate-300 dark:bg-dot-slate-600">
      {areProductsBeingFetched ? (
        <Spinner classname="h-full" />
      ) : Object.keys(items).length > 0 ? (
        Object.keys(items).map((item: any) => {
          return (
            <ProductsMap
              products={{
                category: item,
                data: items[item],
              }}
              isLoading={areProductsBeingFetched}
            />
          );
        })
      ) : (
        <p className="block h-full">No items, containing search query found.</p>
      )}
    </div>
  );
}
