"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import bg from "@/components/assets/bg.jpg";
import { Button } from "./ui/button";
import Link from "next/link";

const coverImages = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/11744254/pexels-photo-11744254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "SHOP BY FOOD SACHET",
    descriptioin:
      "Everything you need to make your restaurant now to next level",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/9859320/pexels-photo-9859320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "SHOP BY RESTAURANT ITEM",
    descriptioin:
      "Everything you need to make your restaurant now to next level",
  },
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/6195273/pexels-photo-6195273.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "SHOP BY OFFICE ITEM",
    descriptioin:
      "Everything you need to make your restaurant now to next level",
  },
];

const HeroCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {coverImages.map((cover, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div>
                <div className=" w-full min-h-[600px] relative overflow-hidden ">
                  <Image
                    src={cover.image}
                    alt="Photo by Drew Beamer"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className=" absolute flex flex-col items-center w-full h-full justify-center text-white px-2 text-center">
                    <h1 className=" text-3xl md:text-5xl font-bold">
                      {cover.title}
                    </h1>
                    <p className=" my-4">{cover.descriptioin}</p>
                    <Button
                      asChild
                      className="  px-10 py-6  rounded-none"
                      // variant="secondary"
                    >
                      <Link href="/list">SHOP NOW</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 md:left-10 text-[#face14]" />
      <CarouselNext className="absolute right-2 md:right-10 text-[#face14]" />
    </Carousel>
  );
};

export default HeroCarousel;
