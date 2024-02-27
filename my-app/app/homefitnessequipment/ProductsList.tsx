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
    <div className="rounded-lg shadow-lg border w-52 m-2">
      <div className="relative" style={{ width: "206px", height: "235px" }}>
        {image && (
          <Image
            src={image}
            fill
            objectFit="conatin"
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
      <div className="px-6 pt-4">
        <div className="text-center font-bold text-base mb-2">{name}</div>
        <p className="text-center text-naivyBlue dark:text-glowGreen text-sm">
          ${price}
        </p>
        {onSale && salePercent && (
          <p className="text-gray-700 text-sm line-through">
            ${price / salePercent}
          </p>
        )}
      </div>
      <div className="flex justify-between py-2 px-1">
        <Button
          variant="outline"
          className="text-xs border-naivyBlue dark:border-glowGreen text-naivyBlue dark:text-glowGreen p-1"
        >
          Add to Cart
          <span>
            <ShoppingCartIcon className="ml-1 h-4 w-4" />
          </span>
        </Button>
        <Button variant="outline" className="text-xs p-1">
          Buy it Now
          <span>
            <CreditCardIcon className="ml-1 h-4 w-4" />
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
