"use client";

import { IconPlus } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addToCart } from "@lib/utils";
import { product } from "@lib/interfaces";
import { useState } from "react";
import { toast } from "./ui/use-toast";

export default function AddToCartSection({
  item,
  switchNameAndManufacturer,
  category,
}: {
  item: product;
  switchNameAndManufacturer?: boolean;
  category: string;
}): JSX.Element {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        defaultValue={quantity}
        onChange={(e) => {
          setQuantity(e.target.valueAsNumber);
        }}
        min={1}
      />
      <Button
        className="w-fit"
        variant="outline"
        onClick={() => {
          addToCart(item, category, quantity, switchNameAndManufacturer),
            toast({
              title: "Item(s) added to cart!",
            });
        }}
      >
        <IconPlus className="mr-2" size={20} />
        Add to cart
      </Button>
    </div>
  );
}
