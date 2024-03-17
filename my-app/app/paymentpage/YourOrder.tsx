"use client";
import { CartItem, Product } from "@prisma/client";
import React from "react";
import ProductDetails from "./ProductDetails";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type YourOrderProps = {
  ProductsDetails: Product[];
  totalPrice: number;
  cartItems: CartItem[];
};

const YourOrder: React.FC<YourOrderProps> = ({
  ProductsDetails,
  totalPrice,
  cartItems,
}) => {
  return (
    <div>
      <div className="flex justify-center mx-auto px-2 sm:px-4 py-1 sm:py-2 w-full">
        <div className="text-xs sm:text-sm md:text-base w-full sm:w-5/6">
          {ProductsDetails.map((product) => {
            const cartItem = cartItems.find(
              (item) => item.productId === product.id
            );
            return (
              <ProductDetails
                key={product.id}
                product={product}
                quantity={cartItem ? cartItem.quantity : 0}
              />
            );
          })}
          <Separator className="bg-black dark:bg-gray-500" />
          <div className="my-4">
            <div className="flex flex-col space-y-4 my-2">
              <div className="flex justify-between">
                <div className="text-xs sm:text-sm md:text-base justify-start">
                  Sub-Total
                </div>
                <div className="text-xs sm:text-sm md:text-base">
                  ${totalPrice}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs sm:text-sm md:text-base">
                  Shipping (Free on orders over $250)
                </div>
                {totalPrice && totalPrice >= 250 ? (
                  <div className="text-xs sm:text-sm md:text-base">
                    Free Shipping !
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm md:text-base">${15}</div>
                )}
              </div>
              <div className="flex justify-between">
                <div className="text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
                  Total
                </div>
                {totalPrice && totalPrice >= 250 ? (
                  <div className="text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
                    ${totalPrice}
                  </div>
                ) : (
                  <div className="text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
                    ${totalPrice && totalPrice + 15}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <Button
              variant={"outline"}
              className="text-sm sm:text-lg md:text-xl hover:scale-105"
            >
              <Link href="/" className="flex items-center">
                <span>
                  <ArrowUturnLeftIcon className="h-3 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1" />
                </span>
                Back to cart
              </Link>
            </Button>
            <Button
              variant={"outline"}
              className="text-sm sm:text-lg md:text-xl hover:scale-105 bg-naivyBlue hover:bg-naivyBlue/80 hover:text-white text-white dark:text-black dark:bg-glowGreen dark:hover:bg-glowGreen/70 dark:hover:text-black"
            >
              Continue
              <span>
                <ArrowRightIcon className="h-3 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOrder;
