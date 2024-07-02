"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CartModal from "./CartModal";
import Image from "next/image";
import { useSelector } from "react-redux";
import Popup from "./Popup";

const PopupCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Popup value="Cart">
            <div className="relative cursor-pointer flex">
              <Image
                src="/cart.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
              />
              {cartItems.length > 0 && (
                <div className=" w-6 h-6 bg-[#face14] font-bold text-black text-sm rounded-full flex items-center justify-center">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Popup>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 md:w-100 md:mr-4">
        <div>
          <CartModal cartItems={cartItems} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopupCart;
