"use client";
import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  CreditCardIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, price, onSale, salePercent } = product;

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg border w-32 sm:w-52 m-1 sm:m-2">
      <div className="relative w-[126px] h-[155px] sm:w-[206px] sm:h-[235px]">
        {image && (
          <>
            <Image
              src={image}
              fill
              alt={`${id}'s picture`}
              className="rounded-t-lg"
              style={{
                objectFit: "fill",
                filter: "brightness(100%)",
                transition: "filter 0.3s ease",
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white text-center cursor-pointer">
              <span className="text-sm underline underline-offset-1">
                More Info
              </span>
              <span>
                <InformationCircleIcon className="w-6 h-6 ml-1" />
              </span>
            </div>
          </>
        )}
        {onSale && (
          <div className="absolute top-0 text-sm rounded-tr-lg right-0 bg-naivyBlue dark:bg-glowGreen text-black p-1">
            Sale!
          </div>
        )}
      </div>
      <div className="px-1 sm:px-2 pt-1 sm:pt-4">
        <div className="text-center font-bold text-base sm:text-lg mb-2">
          {name}
        </div>
        <div className="flex justify-center">
          <p
            className={`text-naivyBlue dark:text-glowGreen text-sm ${
              onSale ? "line-through" : ""
            }`}
          >
            ${price.toFixed(2)}
          </p>
          {onSale && salePercent && (
            <p className="text-gray-700 dark:text-white text-sm ml-2">
              ${((price * (100 - salePercent)) / 100).toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 justify-between py-2 px-2">
        <Button
          variant="outline"
          className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs p-1 border border-naivyBlue dark:border-glowGreen"
        >
          Add to Cart
          <span>
            <ShoppingCartIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </span>
        </Button>
        <Button variant="outline" className="text-xxs sm:text-xs p-1">
          Buy it Now
          <span>
            <CreditCardIcon className="ml-1 -3 w-3 sm:h-4 sm:w-4" />
          </span>
        </Button>
      </div>
    </div>
  );
};

type ProductsListProps = {
  HomeFitnessProducts: Product[];
};

const ProductsList: React.FC<ProductsListProps> = ({ HomeFitnessProducts }) => {
  return (
    <div className="flex flex-wrap justify-center px-2">
      {HomeFitnessProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
