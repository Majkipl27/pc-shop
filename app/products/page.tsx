"use client";
import ProductsMap from "@components/productsMap";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
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
  const [possibleOptions, setPossibleOptions] = useState<unknown>([]);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const url = params.toString();
  const category = params.get("category");

  async function fetchProducts(): Promise<void> {
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
        setProducts(res.body.data);
        setTotalLength(res.body.totalLength);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch data.",
      });
    }
  }

  async function fetchPossibleOptions() {
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
        setPossibleOptions(res.body);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch possible options.",
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

  function updateSearchParams(key: string, value: string): void {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value);
    router.push(pathname + "?" + newParams.toString());
  }

  useEffect(() => {
    // fetchProducts();
    // fetchPossibleOptions();
  }, []);

  useEffect(() => {
    checkSearchParams();
  }, [url]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1>Products</h1>
      <ProductsMap products={products} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (skip - take >= 0) {
                  updateSearchParams("skip", (skip - take).toString());
                }
              }}
            />
          </PaginationItem>
          {skip / take > 2 && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    updateSearchParams("skip", "0");
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationEllipsis>
                <PaginationLink>...</PaginationLink>
              </PaginationEllipsis>
            </>
          )}
          {skip / take >= 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (skip - take >= 0) {
                    updateSearchParams("skip", (skip - take).toString());
                  }
                }}
              >
                {Math.floor(skip / take)}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive className="cursor-default">
              {Math.floor(skip / take + 1)}
            </PaginationLink>
          </PaginationItem>
          {skip / take < Math.ceil(totalLength) / take - 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (skip + take < Math.ceil(totalLength)) {
                    updateSearchParams("skip", (skip + take).toString());
                  }
                }}
              >
                {Math.floor(skip / take + 2)}
              </PaginationLink>
            </PaginationItem>
          )}
          {skip / take < Math.ceil(totalLength) / take - 2 && (
            <>
              <PaginationEllipsis>
                <PaginationLink>...</PaginationLink>
              </PaginationEllipsis>
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    updateSearchParams(
                      "skip",
                      (Math.floor(totalLength / take) * take).toString()
                    );
                  }}
                >
                  {Math.ceil(totalLength / take)}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (skip + take < Math.ceil(totalLength)) {
                  updateSearchParams("skip", (skip + take).toString());
                }
              }}
            />
          </PaginationItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-36">
                Items per page: {take}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup className="w-32">
                <DropdownMenuItem
                  onClick={() => {
                    setTake(10);
                    updateSearchParams("take", "10");
                  }}
                >
                  10
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTake(20);
                    updateSearchParams("take", "20");
                  }}
                >
                  20
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTake(50);
                    updateSearchParams("take", "50");
                  }}
                >
                  50
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
