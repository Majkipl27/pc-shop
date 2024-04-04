"use client";

import * as React from "react";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { IconCaretUpDown, IconCheck } from "@tabler/icons-react";
import { Checkbox } from "./checkbox";

export function Combobox({
  placeholder = "Select option...",
  notFound = "No options found.",
  data,
  onChange,
  checkBoxes = false,
  defaultCheckedCheckboxes,
}: {
  placeholder?: string;
  notFound?: string;
  data: { label: string; value: string }[];
  onChange: (value: string[]) => void;
  checkBoxes?: boolean;
  defaultCheckedCheckboxes?: string[];
}) {
  const [open, setOpen] = React.useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = React.useState<string[]>(
    defaultCheckedCheckboxes || []
  );
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    onChange(checkedCheckboxes);
  }, [checkedCheckboxes]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((i) => i.value === value)?.label
            : checkBoxes
            ? checkedCheckboxes.length > 0
              ? `${checkedCheckboxes.length} ${
                  checkedCheckboxes.length === 1 ? " checkbox" : " checkboxes"
                } selected`
              : placeholder
            : placeholder}
          <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{notFound}</CommandEmpty>
          <CommandGroup className="max-h-80 overflow-y-auto">
            {data.map((i) => {
              return checkBoxes ? (
                <CommandItem key={i.value} value={i.value}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={checkedCheckboxes.includes(i.value)}
                      id={i.value}
                      value={i.value}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCheckedCheckboxes([...checkedCheckboxes, i.value]);
                        } else {
                          setCheckedCheckboxes(
                            checkedCheckboxes.filter((c) => c !== i.value)
                          );
                        }
                      }}
                    />
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor={i.value}
                    >
                      {i.label}
                    </label>
                  </div>
                </CommandItem>
              ) : (
                <CommandItem
                  key={i.value}
                  value={i.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <IconCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === i.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {i.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
