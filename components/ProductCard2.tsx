import React from "react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ProductModal } from "./ProductModal";
import { useToast } from "./ui/use-toast";

const ProductCard2 = ({ products = [] }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.images[0].url,
        minOrderQuantity: product.minOrderQuantity,
        variant: product.variants[0],
        quantity: product.minOrderQuantity,
      })
    );
    toast({
      variant: "success",
      description: "Item added to cart",
    });
  };
  return (
    <div className="mt-12 flex gap-x-2  md:gap-x-4 gap-y-16  flex-wrap  ">
      {products.map((product) => (
        <div
          className=" flex flex-col  w-[48%] md:w-[30%] lg:w-[22%] xl:w-[18.58%]  rounded-md"
          key={product._id}
        >
          <Link href={`/products/${product._id}`}>
            <div className="relative w-full h-72">
              <Image
                src={product.images[0].url || "/product.png"}
                alt=""
                fill
                className="absolute object-cover  z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              <Image
                src={
                  product.images[1].url.length > 1
                    ? product.images[1].url
                    : product.images[0].url || "/productPlaceholder.png"
                }
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover "
              />
            </div>
          </Link>
          <div className=" mt-4">
            <div className="flex justify-between items-center mb-2">
              <Link href={`/products/${product._id}`}>
                <span className="font-medium text-sm  hover:underline">
                  {product.name}
                </span>
              </Link>

              <span className="font-semibold text-sm">
                {product.variants[0]?.discountPrice}tk
              </span>
            </div>
            <div className=" flex justify-between">
              <button
                onClick={() => handleAddToCart(product)}
                className=" ring-1 ring-[#face14] font-semibold text-black py-2 px-4 w-max text-xs hover:bg-transparent bg-[#face14] rounded-md "
              >
                {" "}
                Add To Cart
              </button>
              <ProductModal name="View" product={product} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard2;
