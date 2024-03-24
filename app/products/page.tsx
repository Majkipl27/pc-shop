"use client";
import ProductsMap from "@components/productsMap";
import { toast } from "@components/ui/use-toast";
import { products } from "@lib/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<products>({
    category: "",
    data: [],
  });
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const url = params.toString();
  const category = params.get("category");

  async function fetchProducts() {
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
        setProducts(res.body);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch data.",
      });
    }
  }

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
    // fetchProducts();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1>Products</h1>
      {category}
      <ProductsMap products={products} />
    </div>
  );
}
