import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ carousel, products = [] }) => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 3xl:basis-1/6"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {carousel && (
          <>
            <CarouselPrevious className="absolute -top-6 left-full -translate-x-20 text-[#face14]" />
            <CarouselNext className="absolute right-2 -top-6 md:right-0 text-[#face14]" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
