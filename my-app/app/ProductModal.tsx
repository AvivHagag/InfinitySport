import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CreditCardIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/src/components/ui/button";
interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-gray-600 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 w-full overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-1 border shadow-lg h-[394px] w-3/4 rounded-xl bg-white dark:bg-slate-950">
        <div className="absolute right-0 top-0 p-1">
          <XMarkIcon className="h-6 w-6" onClick={onClose} />
        </div>
        <div className="flex flex-row w-auto">
          <div className="relative w-96 h-96 flex-shrink-0">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-tl-lg rounded-bl-lg"
                style={{
                  objectFit: "fill",
                }}
              />
            )}
          </div>
          <div className="flex flex-grow flex-col mt-3 px-1">
            <h2 className="text-lg font-medium capitalize text-naivyBlue dark:text-glowGreen">
              {product.name}, {product.manufacturer}
            </h2>
            <div className="py-1 flex items-center">
              <p
                className={`text-naivyBlue dark:text-glowGreen text-base ${
                  product.onSale ? "line-through" : ""
                }`}
              >
                ${product.price.toFixed(2)}
              </p>
              {product.onSale && product.salePercent && (
                <p className="text-gray-700 dark:text-white text-lg sm:ml-2">
                  $
                  {(
                    (product.price * (100 - product.salePercent)) /
                    100
                  ).toFixed(2)}
                </p>
              )}
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-base">Description :</span>{" "}
              <ScrollArea className="h-40 border border-naivyBlue dark:border-glowGreen">
                <p className="text-sm px-1">{product.description}</p>
              </ScrollArea>
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-base text-naivyBlue dark:text-glowGreen">
                Color:
              </span>{" "}
              {product.color}
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-base text-naivyBlue dark:text-glowGreen">
                Size:
              </span>{" "}
              {product.size}
            </div>
            <div className="flex justify-center space-x-4 py-1">
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
        </div>
      </div>
    </div>
  );
}
