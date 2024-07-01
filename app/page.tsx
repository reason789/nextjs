"use client";
import React, { Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RelatedProducts from "@/components/RelatedProducts";
import ProductDisplay from "@/components/ProductDisplay";
import ProductCard2 from "@/components/ProductCard2";
import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/products/productsSlice";
import Skeleton from "@/components/Skeleton";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const featuredProducts = products?.docs?.filter(
    (product) => product.featured === true
  );

  const latestProducts = products?.docs?.slice().reverse().slice(0, 7);

  if (status === "loading") {
    return <LoadingOverlay />;
  }

  return (
    <div className="">
      <HeroCarousel />
      <div className="px-4 md:px-8 lg:px-16 m-auto relative max-w-screen-xl mt-20 mb-6">
        <div className="mb-24">
          <h1 className="font-semibold text-xl md:text-3xl">
            FEATURED PRODUCTS
          </h1>
          <Suspense fallback={<Skeleton />}>
            <ProductCard2 products={featuredProducts} />
          </Suspense>
        </div>
        <h1 className="font-semibold text-xl md:text-3xl">
          EXPLORE OUR CATEGORIES
        </h1>
        <div className="my-10 md:flex">
          <Link
            className="block relative md:w-1/2 min-h-96 md:mr-2 overflow-hidden h-72 md:h-auto mb-4 md:mb-0"
            href="/list?category=food-sachet"
            passHref
          >
            <div className="relative w-full h-full">
              <Image
                src="https://images.pexels.com/photos/11744254/pexels-photo-11744254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Photo by Drew Beamer"
                layout="fill"
                objectFit="cover"
                className="object-cover scale-125 hover:scale-[1.4] transition-all duration-1000"
              />
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <Button className="rounded-none px-10 py-6" variant="secondary">
                  FOOD SACHET
                </Button>
              </div>
            </div>
          </Link>
          <div className="md:w-1/2 md:ml-2 space-y-4 md:space-y-0 md:flex">
            <Link
              className="block relative md:w-1/2 md:mr-2 overflow-hidden h-72 md:h-auto border border-slate-100"
              href="/list?category=restaurant-item"
              passHref
            >
              <Image
                src="https://images.pexels.com/photos/1148215/pexels-photo-1148215.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Photo by Drew Beamer"
                layout="responsive"
                className="object-cover scale-125 hover:scale-[1.4] transition-all duration-1000"
                width={100}
                height={100}
              />
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <Button className="rounded-none px-10 py-6" variant="secondary">
                  RESTAURANT ITEM
                </Button>
              </div>
            </Link>
            <Link
              className="block relative md:w-1/2 md:ml-2 overflow-hidden h-72 md:h-auto border border-slate-100"
              href="/list?category=office-item"
              passHref
            >
              <Image
                src="https://images.pexels.com/photos/10567236/pexels-photo-10567236.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Photo by Drew Beamer"
                layout="responsive"
                className="object-cover scale-125 hover:scale-[1.4] transition-all duration-1000"
                width={100}
                height={100}
              />
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <Button className="rounded-none px-10 py-6" variant="secondary">
                  OFFICE ITEM
                </Button>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-xl md:text-3xl mt-24 mb-10">
            NEW ARRIVAL
          </h1>
          <RelatedProducts carousel={true} products={latestProducts} />
        </div>
        <div className="mt-20 mb-6">
          <Suspense fallback={<Skeleton />}>
            {latestProducts &&
              latestProducts.length > 0 &&
              latestProducts[0] && (
                <ProductDisplay product={latestProducts[0]} />
              )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
