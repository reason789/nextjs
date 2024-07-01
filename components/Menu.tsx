"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartModal from "./CartModal";
import PopupCart from "./PopupCart";
import { ListMinus } from "lucide-react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex items-center gap-8">
      <PopupCart />
      <div>
        <ListMinus
          className=" w-8 h-8"
          onClick={() => setOpen((prev) => !prev)}
        />
        {open && (
          <div className=" absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex items-center justify-center flex-col gap-8 text-xl z-10">
            <Link href="/">Homepage</Link>
            <Link href="/list?category=food-sachet"> Food Sachet</Link>
            <Link href="/list?category=restaurant-item"> Restaurant Item</Link>
            <Link href="/list?category=office-item"> Office Item</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/#">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
