"use client";

import React, { Suspense, useEffect, useState } from "react";
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
import Skeleton from "./Skeleton";
import ProductCard2 from "./ProductCard2";

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
          <div>
            <Suspense fallback={<Skeleton />}>
              <ProductCard2 products={currentProducts} />
            </Suspense>
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
