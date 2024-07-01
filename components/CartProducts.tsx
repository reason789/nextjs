"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/features/cart/cartSlice";
import VariantDetails from "@/components/VariantDetails";

const CartProducts = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    const incrementStep = item.minOrderQuantity > 0 ? 50 : 1;
    dispatch(
      updateCartItemQuantity({
        _id: item._id,
        variantId: item.variant._id,
        quantity: item.quantity + incrementStep,
      })
    );
  };

  const handleDecrement = (item) => {
    const minQuantity = item.minOrderQuantity > 0 ? 500 : 1;
    const incrementStep = item.minOrderQuantity > 0 ? 50 : 1;
    if (item.quantity > minQuantity) {
      dispatch(
        updateCartItemQuantity({
          _id: item._id,
          variantId: item.variant._id,
          quantity: item.quantity - incrementStep,
        })
      );
    }
  };

  const handleRemove = (variantId) => {
    dispatch(removeFromCart({ variantId }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-8">
        <p>Your cart is empty.</p>
        <Link href="/list">
          <Button variant="secondary" className="mt-4">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>
        <div className="float-left md:float-right">
          <Link href="/list">
            <Button variant="secondary">Continue shopping</Button>
          </Link>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex gap-2">
                <div className="w-16 h-[70px] relative">
                  <Image
                    src={item.image}
                    fill
                    alt="image"
                    className="object-cover rounded-md"
                  />
                  <Button
                    className="bg-slate-500 text-white text-xs absolute -top-3 -left-3 rounded-full h-6 w-6 p-1 pb-[5px] hover:bg-red-400 hover:text-white"
                    variant="ghost"
                    onClick={() => handleRemove(item.variant._id)}
                  >
                    x
                  </Button>
                </div>
                <div>
                  <div>
                    <Link href={`/products/${item._id}`}>
                      <p className="whitespace-nowrap mb-1 hover:underline">
                        {item.name}
                      </p>
                    </Link>
                    <VariantDetails variant={item.variant} />
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p>৳{item.variant.discountPrice.toFixed(2)}</p>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center w-max border border-slate-300 rounded-md space-x-4 px-2 py-1">
                <Button
                  className="bg-slate-200 rounded-full h-6 w-6 p-1 pb-[7px]"
                  variant="ghost"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  className="bg-slate-200 rounded-full h-8 w-8 p-1 pb-[6px]"
                  variant="ghost"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <p>৳{(item.variant.discountPrice * item.quantity).toFixed(2)}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartProducts;
