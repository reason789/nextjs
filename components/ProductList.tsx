"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import Paginations from "./Pagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductModal } from "./ProductModal";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useToast } from "./ui/use-toast";

const ProductList = ({ products }) => {
  const PRODUCT_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products?.docs?.length / PRODUCT_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const currentProducts = products?.docs?.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const dispatch = useDispatch();
  const { toast } = useToast();

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
    <>
      {products?.docs?.length === 0 ? (
        <div className="mt-8 flex justify-center items-center min-h-80">
          <p className="text-lg font-semibold text-gray-500">
            No products found
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex gap-x-2 md:gap-x-4 gap-y-16 flex-wrap">
            {currentProducts?.map((product) => (
              <div
                className="flex flex-col justify-between gap-4 w-[48%] md:w-[30%] lg:w-[22%] xl:w-[18.58%]"
                key={product._id}
              >
                <Link href={`/products/${product._id}`}>
                  <div className="relative w-full h-72">
                    <Image
                      src={product.images[0].url || "/product.png"}
                      alt=""
                      fill
                      sizes="25vw"
                      className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease duration-500"
                    />
                    <Image
                      src={
                        product.images[1]
                          ? product.images[1].url
                          : product.images[0].url || "/productPlaceholder.png"
                      }
                      alt=""
                      fill
                      sizes="25vw"
                      className="absolute object-cover"
                    />
                  </div>
                </Link>
                <div>
                  <div className="flex justify-between gap-1 flex-wrap">
                    <span className="font-medium">{product.name}</span>
                    <span className="font-semibold">
                      ৳{product.variants[0]?.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="rounded-md ring-1 ring-[#face14] py-2 px-4 w-max text-xs bg-[#face14] text-black hover:bg-transparent"
                  >
                    Add To Cart
                  </button>
                  <ProductModal name="View" product={product} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`${
                      currentPage === 1
                        ? "cursor-not-allowed text-gray-400 hover:text-gray-400 hover:bg-transparent"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={index + 1 == currentPage}
                      className={
                        index + 1 == currentPage
                          ? "cursor-pointer bg-[#face14] text-black"
                          : "cursor-pointer"
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 1 && currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    className={`${
                      currentPage === totalPages
                        ? "cursor-not-allowed text-gray-400 hover:text-gray-400 hover:bg-transparent"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
