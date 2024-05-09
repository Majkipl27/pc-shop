"use client";
import { product } from "@lib/interfaces";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { transformBadName } from "@lib/utils";
import { Button } from "./ui/button";
import { IconX } from "@tabler/icons-react";
import { Separator } from "./ui/separator";

export default function CartDialog({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: (arg0: boolean) => void;
}): JSX.Element {
  const [cartItems, setCartItems] = useState<
    { item: product; quantity: number }[]
  >([]);

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "");
    setCartItems(cart.items || []);
  }, [isCartOpen]);

  function decreaseQuantity(id: string) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
    );
    window.localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
  }

  function increaseQuantity(id: string) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
    window.localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
  }

  function removeItem(id: string) {
    setCartItems((prev) => prev.filter((item) => item.item.id !== id));
    window.localStorage.setItem(
      "cart",
      JSON.stringify({ items: cartItems.filter((item) => item.item.id !== id) })
    );
  }

  return (
    <Dialog open={isCartOpen} onOpenChange={() => setIsCartOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>Items in your cart:</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, i) => {
              return (
                <div key={item.item.id}>
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => removeItem(item.item.id)}
                    >
                      <IconX size={20} />
                    </Button>
                    <p className="font-bold w-2/3 line-clamp-1">
                      {item.item.manufacturer +
                        " " +
                        transformBadName(item.item.name || "")}
                    </p>
                    <p className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          decreaseQuantity(item.item.id);
                        }}
                        disabled={item.quantity < 2}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button
                        variant="outline"
                        onClick={() => {
                          increaseQuantity(item.item.id);
                        }}
                      >
                        +
                      </Button>
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-2 flex-wrap py-1 px-4">
                    <p className="text-xs text-muted-foreground">
                      Single: {item.item.price + "$"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total:{" "}
                      {((item.item.price || 0) * item.quantity).toFixed(2) +
                        "$"}
                    </p>
                  </div>
                  {i !== cartItems.length - 1 && <Separator />}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-muted-foreground">
                Your cart is empty.
              </p>
              <Button asChild>
                <a href="/categories">Let&apos;s go shopping!</a>
              </Button>
            </div>
          )}
        </div>
        {cartItems && cartItems.length > 0 && (
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold">
              {cartItems
                .reduce(
                  (acc, item) => acc + (item.item.price || 0) * item.quantity,
                  0
                )
                .toFixed(2) + "$"}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
