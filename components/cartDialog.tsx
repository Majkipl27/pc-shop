"use client";
import { cartItem } from "@lib/interfaces";
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
import { Separator } from "./ui/separator";
import {
  IconBolt,
  IconBox,
  IconCpu,
  IconDeviceComputerCamera,
  IconDeviceDesktop,
  IconDeviceFloppy,
  IconFrame,
  IconHeadset,
  IconKeyboard,
  IconMouse,
  IconPhotoScan,
  IconPropeller,
  IconRuler2,
  IconX,
} from "@tabler/icons-react";
import { toast } from "./ui/use-toast";
import { useAtomValue } from "jotai";
import { userAtom } from "@lib/atoms";
import { useRouter } from "next/navigation";

export default function CartDialog({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: (arg0: boolean) => void;
}): JSX.Element {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const isUserLoggedIn = Boolean(useAtomValue(userAtom));
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "{}");
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

  function mapCategoryIcon(category: string): JSX.Element | undefined {
    switch (category) {
      case "Motherboard":
        return <IconFrame size={20} />;
      case "Cpu":
        return <IconCpu size={20} />;
      case "Memory":
        return <IconRuler2 size={20} />;
      case "Gpu":
        return <IconPhotoScan size={20} />;
      case "Case":
        return <IconBox size={20} />;
      case "Power-supply":
        return <IconBolt size={20} />;
      case "Cooling":
        return <IconPropeller size={20} />;
      case "Storage":
        return <IconDeviceFloppy size={20} />;
      case "Headset":
        return <IconHeadset size={20} />;
      case "Mouse":
        return <IconMouse size={20} />;
      case "Keyboard":
        return <IconKeyboard size={20} />;
      case "Monitor":
        return <IconDeviceDesktop size={20} />;
      case "Webcam":
        return <IconDeviceComputerCamera size={20} />;
    }
  }

  function clearCart(): void {
    if (confirm("Are you sure you want to clear your cart?") === false) return;
    setCartItems([]);
    window.localStorage.setItem("cart", JSON.stringify({ items: [] }));
    toast({
      title: "Success!",
      description: "Cart has been cleared.",
    });
    setIsCartOpen(false);
  }

  function orderHandler(): void {
    if (isUserLoggedIn) {
      router.push("/order");
    } else if (confirm("You need to be logged in to order. Do you want to log in?")) {
      router.push("/auth/login");
    }
  }

  return (
    <Dialog open={isCartOpen} onOpenChange={() => setIsCartOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>Items in your cart:</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-4 max-h-80 overflow-y-auto">
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
                  <div className="flex w-full items-center gap-4 flex-wrap py-1 px-4">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {mapCategoryIcon(item.category)}
                      {item.category}
                    </p>
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
            <div className="flex flex-col items-center gap-12 mt-8">
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
          <>
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
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={clearCart}>
                Clear cart
              </Button>
              <Button variant="default" onClick={orderHandler}>
                Order
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
