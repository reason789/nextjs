"use client";

import Campaign from "@/components/Campaign";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/products/productsSlice";
import { RootState } from "@/lib/store";

const ListPage = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  const { products } = useSelector((state: RootState) => state.products);

  const handleFilterChange = (type, value) => {
    if (type === "sort") {
      setSelectedSort(value);
    } else if (type === "category") {
      setSelectedCategory(value);
      setSelectedFilter("");
    }
    const params = new URLSearchParams(searchParams);
    params.set(type, value);
    params.delete("search");
    params.delete("sub-category");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedFilter(category);
    const params = new URLSearchParams(searchParams);
    params.set("sub-category", category);
    replace(`${pathname}?${params.toString()}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const filters = {
    category: selectedCategory,
    subCategory: selectedFilter,
    search: searchTerm,
  };

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [pathname, searchParams, selectedCategory, searchTerm]);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <div className="mt-6"></div>
      <Campaign />
      <Filter
        selectedSort={selectedSort}
        selectedCategory={selectedCategory}
        handleFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
        handleCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Suspense fallback={<Skeleton />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
};

const ListPageWrapper = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <ListPage />
    </Suspense>
  );
};

export default ListPageWrapper;
