"use client";
import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import ProductsList from "./ProductsList";
import Link from "next/link";
import { Product } from "@prisma/client";
import ComboBoxSort from "./ComboBoxSort";

interface MultitrainerComponentProps {
  MultitrainerProducts: Product[];
}

export default function MultitrainerComponent({
  MultitrainerProducts,
}: MultitrainerComponentProps) {
  const [sortedProducts, setSortedProducts] =
    useState<Product[]>(MultitrainerProducts);
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="p-2 flex text-sm sm:text-base text-gray-500 space-x-1">
          <Link href="/" className="hover:scale-105">
            Home Page
          </Link>
          <p>/</p>
          <Link href="/homefitnessequipment" className="hover:scale-105">
            Home Fitness Equipment
          </Link>
          <p>/</p>
          <Link
            href="/homefitnessequipment/multitrainer"
            className="hover:scale-105 text-gray-800 dark:text-gray-200 font-medium"
          >
            Multi Trainer
          </Link>
        </div>
        <div className="flex justify-end">
          <ComboBoxSort
            sortedProducts={sortedProducts}
            setSortedProducts={setSortedProducts}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full">
        <FilterComponent
          sortedProducts={sortedProducts}
          setSortedProducts={setSortedProducts}
        />
        <div className="flex flex-grow">
          {sortedProducts ? (
            <ProductsList MultitrainerProducts={sortedProducts} />
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
