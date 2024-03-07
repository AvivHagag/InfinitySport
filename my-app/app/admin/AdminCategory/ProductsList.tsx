"use client";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  addToCartNewProduct,
  getSession,
} from "../../ServerAction/ServerAction";
import { toast } from "sonner";
import ProductEditModal from "../../ProductEditModal";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, price, onSale, salePercent } = product;
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleAdminOpenModal = () => {
    setIsAdminModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col rounded-lg shadow-lg border w-32 sm:w-52 m-1 sm:m-2">
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
              <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white text-center cursor-pointer"
                onClick={() => handleAdminOpenModal()}
              >
                <span className="text-sm underline underline-offset-1">
                  Edit
                </span>
                <span>
                  <PencilSquareIcon className="w-6 h-6 ml-1" />
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
        <div className="px-1 sm:px-2 pt-1 sm:pt-4 pb-2">
          <div className="text-center font-bold text-base sm:text-lg mb-2">
            {name}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <p
              className={`text-naivyBlue dark:text-glowGreen text-sm ${
                onSale ? "line-through" : ""
              }`}
            >
              ${price.toFixed(2)}
            </p>
            {onSale && salePercent && (
              <p className="text-gray-700 dark:text-white text-sm sm:ml-2">
                ${((price * (100 - salePercent)) / 100).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
      {isAdminModalOpen && (
        <ProductEditModal
          product={product}
          onClose={() => setIsAdminModalOpen(false)}
        />
      )}
    </>
  );
};

type ProductsListProps = {
  Products: Product[];
};

const ProductsList: React.FC<ProductsListProps> = ({ Products }) => {
  return (
    <div className="flex flex-wrap justify-center px-1">
      {Products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
