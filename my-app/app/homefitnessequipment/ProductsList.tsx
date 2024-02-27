"use client";
import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { CreditCardIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, price, onSale, salePercent } = product;

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg border w-32 sm:w-52 m-1 sm:m-2">
      <div className="relative w-[126px] h-[155px] sm:w-[206px] sm:h-[235px]">
        {image && (
          <Image
            src={image}
            fill
            style={{ objectFit: "fill" }}
            alt={`${id}'s picture`}
            className="rounded-t-lg"
          />
        )}
      </div>
      {onSale && (
        <div className="absolute top-0 right-0 bg-red-500 text-white p-1">
          {salePercent}% OFF
        </div>
      )}
      <div className="px-1 sm:px-2 pt-1 sm:pt-4">
        <div className="text-center font-bold text-base sm:text-lg mb-2">
          {name}
        </div>
        <p className="text-center text-naivyBlue dark:text-glowGreen text-sm">
          ${price}
        </p>
        {onSale && salePercent && (
          <p className="text-gray-700 text-sm line-through">
            ${price / salePercent}
          </p>
        )}
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
