"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { transformCategory } from "@/utils/transformCategory";

const categories = [
  {
    id: 0,
    label: "All Category",
    category: "all",
    subCategories: [
      "",
      "coffee",
      "sugar",
      "pizza",
      "toothpick",
      "straw",
      "spoon",
      "cup",
      "umbrella",
      "kitchen",
      "room",
      "toilet",
      "snacks",
    ],
  },
  {
    id: 1,
    label: "Food Sachet",
    category: "food-sachet",
    subCategories: ["", "coffee", "sugar", "pizza", "toothpick"],
  },
  {
    id: 2,
    label: "Restaurant Item",
    category: "restaurant-item",
    subCategories: ["", "straw", "spoon", "cup", "umbrella"],
  },
  {
    id: 3,
    label: "Office Item",
    category: "office-item",
    subCategories: ["", "kitchen", "room", "toilet", "snacks"],
  },
];

const Filter = ({
  selectedSort,
  selectedCategory,
  handleFilterChange,
  selectedFilter,
  handleCategoryChange,
  handleSearchChange,
  searchTerm,
}) => {
  const selectedCategoryData = categories.find(
    (category) => category.category === selectedCategory
  );

  const transformedCategory = transformCategory(selectedCategory);
  return (
    <>
      <div className="mt-12">
        <div className="flex items-center gap-4 md:justify-between flex-wrap">
          {/* TODO: Filter Categories */}
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.category}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="s flex justify-between items-center border border-gray-300 gap-4 p-2 rounded-md focus-within:ring-2 focus-within:ring-[#face14] focus-within:ring-offset-2">
            <input
              type="text"
              name="name"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="cursor-pointer">
              <Image src="/search.png" alt="Search" width={16} height={16} />
            </button>
          </div>
        </div>
        {/* <div className="">
          <Select onValueChange={(value) => handleFilterChange("sort", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="asc price">Price (low to high)</SelectItem>
                <SelectItem value="desc price">Price (high to low)</SelectItem>
                <SelectItem value="asc lastUpdated">Newest</SelectItem>
                <SelectItem value="desc lastUpdated">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
      </div>
      <h1 className="mt-12 mb-14 text-2xl font-semibold">
        {transformedCategory ? transformedCategory : "Items"} for you!
      </h1>

      <div className=" flex items-center gap-1"></div>
      <div className="flex items-center gap-4 flex-wrap">
        <SlidersHorizontal />
        {selectedCategoryData?.subCategories?.map((filter) => (
          <Button
            key={filter}
            variant="secondary"
            size="sm"
            className={`rounded-sm text-xs capitalize ${
              selectedFilter === filter
                ? "bg-[#face14] text-black hover:bg-[#face14] "
                : " hover:bg-[#face14]"
            }`}
            onClick={() => handleCategoryChange(filter)}
          >
            {filter == "" ? "all" : filter}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Filter;
