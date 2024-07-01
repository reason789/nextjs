import Image from "next/image";
import React from "react";

const Campaign = () => {
  return (
    <div className=" hidden bg-pink-50 px-4 sm:flex justify-between h-64">
      <div className=" w-2/3 flex flex-col items-center justify-center gap-8">
        <h1 className=" text-4xl font-semibold leading-[48px]  text-gray-700">
          Grab up to 50% off on <br /> Selected Products
        </h1>
        <button className="  bg-[#face14] text-black w-max py-3 px-10 text-sm">
          Buy Now
        </button>
      </div>
      <div className=" relative w-1/3 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          fill
          className=" object-contain scale-110"
        />
      </div>
    </div>
  );
};

export default Campaign;
