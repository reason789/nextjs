"use client";

import React, { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import checkImage from "@/components/assets/check.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import VariantsMap from "./VariantsMap";
import { useToast } from "@/components/ui/use-toast";

const ProductDisplay = ({ product }) => {
  const { toast } = useToast();
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(50);

  const minimumOrder = product?.minOrderQuantity || 0;
  const minQuantity = minimumOrder > 0 ? 500 : 1;
  const incrementStep = minimumOrder > 0 ? 50 : 1;

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0];
      setSelectedWeight(defaultVariant.weight);
      setSelectedColor(defaultVariant.color);
      setSelectedSize(defaultVariant.size);
      setSelectedShape(defaultVariant.shape);
      setImage(product.images[0]?.url);
      setQuantity(minQuantity);
    }
  }, [product, minQuantity]);

  const getSelectedVariant = () => {
    return product?.variants?.find(
      (variant) =>
        variant.weight === selectedWeight &&
        variant.color === selectedColor &&
        variant.size === selectedSize &&
        variant.shape === selectedShape
    );
  };

  const selectedVariant = getSelectedVariant();

  const handleImageClick = (imageUrl) => {
    setImage(imageUrl);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) =>
      prevQuantity - incrementStep >= minQuantity
        ? prevQuantity - incrementStep
        : minQuantity
    );
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + incrementStep);
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (selectedVariant) {
      dispatch(
        addToCart({
          _id: product._id,
          name: product.name,
          image: product.images[0].url,
          minOrderQuantity: product.minOrderQuantity,
          variant: selectedVariant,
          quantity,
        })
      );
      toast({
        variant: "success",
        description: "Item added to cart",
      });
    }
  };

  return (
    <div className="md:flex space-y-10 md:space-y-0 mt-4">
      <div className="md:w-1/2 md:mr-10 sm:max-w-lg sm:mx-auto md:max-w-none">
        <div>
          <div>
            <AspectRatio ratio={16 / 16} className="bg-muted">
              {image && (
                <Image
                  src={image}
                  fill
                  alt="Product Image"
                  className="rounded-md object-cover"
                />
              )}
            </AspectRatio>
          </div>
          <div className="mt-3 flex gap-4">
            {product?.images?.map((imageItem, index) => (
              <div
                key={index}
                className={`w-20 h-20 md:w-28 md:h-28 rounded-md overflow-hidden cursor-pointer ${
                  imageItem.url === image && "opacity-40"
                }`}
                onClick={() => handleImageClick(imageItem.url)}
              >
                <Image
                  src={imageItem.url}
                  alt="Product Thumbnail"
                  className="object-cover w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Portion */}
      <div className="md:w-1/2 md:mr-10 sm:max-w-lg sm:mx-auto md:max-w-none">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl">{product?.name}</h1>
          <div className="flex items-center gap-1 mt-7 mb-2">
            <div className="w-4 h-4">
              <Image
                src={checkImage}
                alt="In stock"
                layout="responsive"
                className="object-cover w-full h-full"
                width={100}
                height={100}
              />
            </div>
            <p className="text-green-600">In stock</p>
          </div>
          <h2 className="text-xl font-semibold">
            Discount Price ৳
            {selectedVariant?.discountPrice &&
              (selectedVariant?.discountPrice).toFixed(2)}
          </h2>
          <span className="text-sm text-slate-700">
            (Save Amount- ৳
            {(selectedVariant?.price - selectedVariant?.discountPrice).toFixed(
              2
            )}
            )
          </span>
          <h2 className="line-through text-slate-500">
            Regular Price ৳
            {selectedVariant?.price && (selectedVariant?.price).toFixed(2)}
          </h2>
          <div className="mt-6">
            <VariantsMap
              product={product}
              selectedWeight={selectedWeight}
              setSelectedWeight={setSelectedWeight}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              selectedShape={selectedShape}
              setSelectedShape={setSelectedShape}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <p className="mt-6 mb-3">Quantity</p>
          <div className="flex gap-2">
            <div className="flex items-center border border-slate-300 rounded-md space-x-4 px-2 py-1">
              <Button
                className="bg-slate-200 rounded-full h-6 w-6 p-1 pb-[7px]"
                variant="ghost"
                onClick={handleDecrement}
              >
                -
              </Button>
              <span className="">{quantity}</span>
              <Button
                className="bg-slate-200 rounded-full h-8 w-8 p-1 pb-[6px]"
                variant="ghost"
                onClick={handleIncrement}
              >
                +
              </Button>
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              {" "}
              Add To Cart
            </Button>
          </div>
          <Separator className="my-6" />
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Why you buy?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    <span className="font-semibold">Quality: </span>
                    <p className="text-slate-500">5 star rated product.</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-semibold">Measurement: </span>
                    <p className="text-slate-500">100% accurate measurement.</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-semibold">Consumer: </span>
                    <p className="text-slate-500">
                      4 & 5 star hotel and resort's owners are our consumer
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-semibold flex-shrink-0">
                      Production:{" "}
                    </span>
                    <p className="text-slate-500">
                      We produce products based on your order. So you will get
                      always fresh products with longer expiration date.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
