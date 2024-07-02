import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { ProductModal } from "./ProductModal";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useToast } from "./ui/use-toast";

const ProductCard = ({ product }) => {
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
    <div>
      <Card>
        <Link href={`/products/${product._id}`}>
          <CardContent className=" p-0">
            <div className=" w-full h-64 relative overflow-hidden">
              <Image
                src={product.images[0].url}
                alt="Photo by Drew Beamer"
                layout="fill"
                objectFit="cover"
                className=" hover:scale-110 duration-300"
              />
            </div>
            <div className=" px-2 pt-3">
              <Link href={`/products/${product._id}`}>
                <p className=" text-sm  hover:underline cursor-pointer">
                  {product.name}
                </p>
              </Link>
              <span className=" text-xs text-muted-foreground">
                Price: ৳{product?.variants[0]?.discountPrice}
              </span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="flex gap-2 px-2 py-3 flex-col items-stretch ">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleAddToCart(product)}
              className=" rounded-md ring-1 ring-[#face14] font-semibold py-2 px-4 w-max text-xs bg-[#face14] text-black hover:bg-transparent "
            >
              Add To Cart
            </button>
            {/* <Button size="sm" className=" text-xs" variant="secondary">
              View
            </Button> */}
            <ProductModal name="View" product={product} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
