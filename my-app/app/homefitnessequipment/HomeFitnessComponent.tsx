"use client";
import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import ProductsList from "./ProductsList";
import Link from "next/link";
import { Product } from "@prisma/client";
import ComboBoxSort from "./ComboBoxSort";

interface HomeFitnessComponentProps {
  HomeFitnessProducts: Product[];
}

export default function HomeFitnessComponent({
  HomeFitnessProducts,
}: HomeFitnessComponentProps) {
  const [sortedProducts, setSortedProducts] =
    useState<Product[]>(HomeFitnessProducts);
  return (
    <>
      <div className="flex justify-between">
        <div className="p-2 flex text-sm sm:text-base text-gray-500 space-x-1">
          <Link href="/" className="hover:scale-105">
            Home Page
          </Link>
          <p>/</p>
          <Link
            href="/homefitnessequipment"
            className="hover:scale-105 text-gray-800 dark:text-text-gray-200 font-medium"
          >
            Home Fitness Equipment
          </Link>
        </div>
        <ComboBoxSort
          sortedProducts={sortedProducts}
          setSortedProducts={setSortedProducts}
        />
      </div>
      <div className="flex flex-row w-full">
        <FilterComponent />
        <div className="flex flex-grow">
          {sortedProducts ? (
            <ProductsList HomeFitnessProducts={sortedProducts} />
          ) : (
            <div className="text-base text-center">
              There are currently no products in the selected category
            </div>
          )}
        </div>
      </div>
    </>
  );
}