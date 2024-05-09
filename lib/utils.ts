import { NextResponse } from "next/server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cartItem, product } from "./interfaces";

/**
 * Returns a Response object with a JSON body
 */
export function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new NextResponse(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformBadName(name: string) {
  name = name.slice(1, -1);
  return name.replaceAll(",", " ");
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addToCart(
  item: product,
  category: string,
  quantity: number = 1,
  switchNameAndManufacturer: boolean = false
) {
  let cartItems: {
    items: cartItem[];
  } = JSON.parse(window.localStorage.getItem("cart") || "{}");

  if (switchNameAndManufacturer) {
    const temp = item.name;
    item.name = item.manufacturer;
    item.manufacturer = temp;
  }

  if (cartItems.items) {
    if (Object.values(cartItems.items).some((i) => i.item.id === item.id)) {
      cartItems.items = cartItems.items.map((i) => {
        if (i.item.id === item.id) {
          i.quantity += quantity;
        }
        return i;
      });
    } else cartItems.items.push({ item, quantity, category });
  } else {
    cartItems.items = [{ item, quantity, category }];
  }

  window.localStorage.setItem("cart", JSON.stringify(cartItems));
}
