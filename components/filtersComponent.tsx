"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Switch } from "./ui/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Spinner from "./spinner";

export default function FiltersComponent({
  possibleOptions,
  updateFilters,
  areFiltersBeingFetched,
}: {
  possibleOptions: { [key: string]: string[] | string };
  updateFilters: (options: {
    key: string;
    data: string | string[] | number | boolean;
  }) => void;
  areFiltersBeingFetched: boolean;
}): JSX.Element | null {
  const [checkedBooleans, setCheckedBooleans] = useState<{
    [key: string]: boolean;
  }>({});
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    for (const key in checkedBooleans) {
      newParams.set(key, checkedBooleans[key].toString());
    }
    router.push(pathname + "?" + newParams.toString());
  }, [checkedBooleans]);

  if (params.get("category") === null) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="!mt-0">
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filter products by your preferences.
          </SheetDescription>
        </SheetHeader>
        {areFiltersBeingFetched ? (
          <Spinner classname="mt-8 mx-auto" />
        ) : (
          <div className="flex flex-col space-y-4 mt-4">
            {Object.entries(possibleOptions).map(([key, value]) => {
              return (
                <div key={key}>
                  <p className="font-bold mb-2">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
                  </p>
                  {Array.isArray(value) ? (
                    <Combobox
                      checkBoxes
                      placeholder="Select options..."
                      data={value.map((v) => {
                        return { label: v, value: v };
                      })}
                      defaultCheckedCheckboxes={
                        params.getAll(key).map((d) => d.toString()) as string[]
                      }
                      onChange={(data: string[]) => {
                        updateFilters({
                          key: key,
                          data: data.map((d) => d.toString()),
                        });
                      }}
                    />
                  ) : value === "gte" ? (
                    <Input
                      type="number"
                      placeholder="(Minimum)"
                      min={0}
                      defaultValue={
                        params.get(key)
                          ? (params.get(key) as string)
                          : undefined
                      }
                      onChange={(e) => {
                        updateFilters({
                          key: key,
                          data: e.target.value,
                        });
                      }}
                    />
                  ) : value === "lte" ? (
                    <Input
                      type="number"
                      placeholder="(Maximum)"
                      min={0}
                      onChange={(e) => {
                        updateFilters({
                          key: key,
                          data: e.target.value,
                        });
                      }}
                      defaultValue={
                        params.get(key)
                          ? (params.get(key) as string)
                          : undefined
                      }
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={key}
                        defaultChecked={params.get(key) === "true"}
                        onCheckedChange={(checked) => {
                          setCheckedBooleans({
                            ...checkedBooleans,
                            [key]: checked,
                          });
                        }}
                      />
                      <label htmlFor={key}>
                        {checkedBooleans[key] ? "Enabled " : "Disabled "}
                        (don&apos;t touch for ignore)
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
            <div>
              <p className="font-bold mb-2">Price $</p>
              <div className="flex flex-row space-x-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  min={0}
                  onChange={(e) => {
                    updateFilters({
                      key: "minPrice",
                      data: e.target.value,
                    });
                  }}
                  defaultValue={
                    params.get("minPrice")
                      ? (params.get("minPrice") as string)
                      : undefined
                  }
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  min={0}
                  onChange={(e) => {
                    updateFilters({
                      key: "maxPrice",
                      data: e.target.value,
                    });
                  }}
                  defaultValue={
                    params.get("maxPrice")
                      ? (params.get("maxPrice") as string)
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
