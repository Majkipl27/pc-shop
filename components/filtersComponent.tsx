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
  areFiltersBeingFetched,
}: {
  possibleOptions: { [key: string]: string[] | string };
  areFiltersBeingFetched: boolean;
}): JSX.Element | null {
  const [checkedBooleans, setCheckedBooleans] = useState<{
    [key: string]: boolean;
  }>({});
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
        newParams.delete(options.key.toString());
      else newParams.set(options.key, options.data.toString());
    }
    router.push(pathname + "?" + newParams.toString());
  }

  function deleteSearchParam(key: string): void {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete(key);
    setCheckedBooleans((checkedBooleans) => {
      delete checkedBooleans[key];
      return { ...checkedBooleans };
    });
    router.push(pathname + "?" + newParams.toString());
  }

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    const possibleBooleans: string[] = [];
    for (const key in possibleOptions) {
      if (possibleOptions[key] === "boolean") {
        possibleBooleans.push(key);
      }
    }
    possibleBooleans.forEach((key) => {
      newParams.delete(key);
    });
    for (const key in checkedBooleans) {
      newParams.set(key, checkedBooleans[key].toString());
    }
    router.push(pathname + "?" + newParams.toString());
  }, [checkedBooleans]);

  useEffect(() => {
    if (!possibleOptions) return;
    const newCheckedBooleans: { [key: string]: boolean } = {};
    const possibleBooleans: string[] = [];
    for (const key in possibleOptions) {
      if (possibleOptions[key] === "boolean") {
        possibleBooleans.push(key);
      }
    }
    possibleBooleans.forEach((key) => {
      if (params.get(key) === null) return;
      newCheckedBooleans[key] = params.get(key) === "true";
    });
    setCheckedBooleans(newCheckedBooleans);
  }, [possibleOptions, setCheckedBooleans]);

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
                        checked={checkedBooleans[key] ? true : false}
                        onCheckedChange={(checked) => {
                          setCheckedBooleans({
                            ...checkedBooleans,
                            [key]: checked,
                          });
                        }}
                      />
                      <label htmlFor={key}>
                        {checkedBooleans[key] !== undefined
                          ? checkedBooleans[key] === true
                            ? "Enabled"
                            : "Disabled"
                          : "Enable/Disable"}
                      </label>
                      {checkedBooleans[key] ? (
                        <Button
                          variant="outline"
                          onClick={() => {
                            deleteSearchParam(key);
                          }}
                        >
                          Clear
                        </Button>
                      ) : null}
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
            <div className="flex items-center space-x-2">
              <Switch
                id="all"
                checked={params.get("all") === "true" ? true : false}
                onCheckedChange={(checked) => {
                  updateFilters({
                    key: "all",
                    data: checked,
                  });
                }}
              />
              <label htmlFor="all">
                Show all products (even not in stock)
              </label>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
