import Image from "next/image";
import React from "react";
import { Label } from "./ui/label";
import VariantDetails from "./VariantDetails";

const PaymentItems = ({ item }) => {
  return (
    <div className=" flex items-center justify-between">
      <div className="flex items-center space-x-4 ">
        <div className=" w-10 h-10  relative">
          <Image
            src={item.image}
            fill
            alt="image"
            className="object-cover rounded-md"
          />
          <p className=" absolute -top-3 -right-3 bg-slate-500 text-sm max-w-max  text-white px-[6px]  rounded-full  flex items-center justify-center">
            {item.quantity}
          </p>
        </div>
        <div>
          <p className=" text-slate-600 text-sm">{item.name}</p>
          <VariantDetails variant={item.variant} />
        </div>
      </div>
      <Label>৳{(item.variant.discountPrice * item.quantity).toFixed(2)}</Label>
    </div>
  );
};

export default PaymentItems;
