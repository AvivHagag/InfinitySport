import { Product } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CreditCardIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/src/components/ui/button";
import { getSession } from "next-auth/react";
import {
  UpdateQuantityItemInCart,
  addToCartNewProduct,
} from "./ServerAction/ServerAction";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";

interface CartItemType {
  cartId: number;
  productId: number;
  quantity: number;
}

interface ProductModalProps {
  product: Product;
  CartItems?: CartItemType[];
  newValue: number;
  setNewValue: React.Dispatch<React.SetStateAction<number>>;
  quantityError: boolean;
  setQuantityError: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export default function ProductModal({
  product,
  CartItems,
  newValue,
  setNewValue,
  quantityError,
  setQuantityError,
  onClose,
}: ProductModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const cartItem = CartItems
    ? CartItems.find((item) => item.productId === product.id)
    : null;
  const isInCart = cartItem !== undefined;
  const router = useRouter();

  const handleAddToCart = async (
    ProductID: number,
    productImage: string,
    ProductName: string
  ) => {
    if (await getSession()) {
      setIsLoading(true);
      await addToCartNewProduct(ProductID, 1);
      toast(
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-naivyBlue dark:text-glowGreen">
              Added to the cart !
            </p>

            <p className="text-xs text-naivyBlue dark:text-glowGreen">
              {ProductName}
            </p>
          </div>
          <div>
            <img
              src={productImage}
              alt={ProductName}
              style={{ width: "50px", height: "auto" }}
            />
          </div>
        </div>,
        { duration: 1250 }
      );
      setIsLoading(false);
      router.refresh();
    } else {
      console.log(false);
    }
  };

  const handleQuantityUpdate = (
    action: "increase" | "decrease" | ChangeEvent<HTMLInputElement>
  ) => {
    setQuantityError(false);
    let newQuantity = newValue;
    if (action === "increase") {
      if (newValue == product.quantity) {
        setQuantityError(true);
        return;
      }
      newQuantity = Math.min(newValue + 1, product.quantity);
    } else if (action === "decrease") {
      newQuantity = newValue - 1;
    } else if (action && typeof action !== "string") {
      const inputVal = Number(action.target.value);
      newQuantity = Math.min(product.quantity, inputVal);
    }
    setNewValue(newQuantity);
    UpdateFunction(newQuantity);
  };

  const UpdateFunction = async (newQuantity: number) => {
    if (cartItem?.cartId) {
      setIsLoadingUpdate(true);
      await UpdateQuantityItemInCart(newQuantity, product.id, cartItem?.cartId);
      router.refresh();
      setIsLoadingUpdate(false);
    }
    return;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-600 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 w-full overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-1 border shadow-lg h-4/5 md:h-[394px] w-4/5 sm:w-3/4 rounded-xl bg-white dark:bg-slate-950">
        <div className="absolute right-0 top-0 p-1">
          <XMarkIcon className="h-6 w-6" onClick={onClose} />
        </div>
        <div className="flex flex-col sm:flex-row w-auto">
          <div className="relative hidden md:block sm:w-96 sm:h-96 flex-shrink-0">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="sm:rounded-tl-lg sm:rounded-bl-lg"
                style={{
                  objectFit: "fill",
                }}
              />
            )}
          </div>
          <div className="flex flex-grow flex-col mt-3 px-2">
            <div className="hidden md:block">
              <h2 className="text-lg font-medium capitalize text-naivyBlue dark:text-glowGreen">
                {product.name}, {product.manufacturer}
                {product.onSale && (
                  <span className="text-base mx-4 p-1 rounded bg-naivyBlue dark:bg-glowGreen text-white dark:text-black">
                    Sale!
                  </span>
                )}
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
            </div>
            <div className="flex flex-row items-center md:hidden pt-3 justify-between">
              <div className="flex flex-col md:hidden">
                <h2 className="text-lg font-medium capitalize text-naivyBlue dark:text-glowGreen">
                  {product.name}, {product.manufacturer}
                  {product.onSale && (
                    <span className="text-base mx-4 p-1 rounded bg-naivyBlue dark:bg-glowGreen text-white dark:text-black">
                      Sale!
                    </span>
                  )}
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
              </div>
              <div className="relative w-24 h-24 flex-shrink-0">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="rounded-lg"
                    fill
                    style={{
                      objectFit: "fill",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-sm text-naivyBlue dark:text-glowGreen">
                Description:
              </span>{" "}
              <ScrollArea className="h-40 border">
                <p className="text-xs pl-1 pr-2">{product.description}</p>
              </ScrollArea>
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-sm text-naivyBlue dark:text-glowGreen">
                Color:
              </span>{" "}
              {product.color}
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-sm text-naivyBlue dark:text-glowGreen">
                Size:
              </span>{" "}
              {product.size}
            </div>
            {isLoadingUpdate ? (
              <div className="flex items-center justify-center pb-2 space-x-2">
                <p className="text-naivyBlue dark:text-glowGreen text-xxs">
                  Updating ..
                </p>
                <ClipLoader
                  color="#FFFFFF dark:#9ffd32"
                  className="text-naivyBlue dark:text-glowGreen"
                  size={20}
                />
              </div>
            ) : (
              <>
                <div className="flex justify-center space-x-4 py-1">
                  {isInCart && cartItem ? (
                    <>
                      <div className="flex flex-col mx-auto p-1">
                        <div className="flex space-x-1 justify-center">
                          <Button
                            variant="outline"
                            className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-1 sm:p-1 border border-naivyBlue dark:border-glowGreen"
                          >
                            <span
                              onClick={() => handleQuantityUpdate("decrease")}
                            >
                              {cartItem.quantity == 1 ? (
                                <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                            </span>
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max={product.quantity}
                            value={newValue}
                            step={1}
                            onChange={(e) => handleQuantityUpdate(e)}
                            className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-4 sm:py-1 border border-naivyBlue dark:border-glowGreen"
                            placeholder={cartItem.quantity.toString()}
                          />

                          <Button
                            variant="outline"
                            className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-1 sm:p-1 border border-naivyBlue dark:border-glowGreen"
                          >
                            <span
                              onClick={() => handleQuantityUpdate("increase")}
                            >
                              <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                          </Button>
                        </div>
                        {quantityError ? (
                          <p className="text-sm text-red-600">
                            Limit of the stock
                          </p>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs p-1 border border-naivyBlue dark:border-glowGreen"
                        onClick={() => {
                          isLoading
                            ? null
                            : handleAddToCart(
                                product.id,
                                product.image ? product.image : "null",
                                product.name
                              );
                        }}
                      >
                        {isLoading ? (
                          <>
                            <p className="text-naivyBlue dark:text-glowGreen text-xxs">
                              Adding ..{" "}
                            </p>
                            <ClipLoader
                              color="#FFFFFF dark:#9ffd32"
                              className="text-naivyBlue dark:text-glowGreen"
                              size={20}
                            />
                          </>
                        ) : (
                          <>
                            Add to Cart
                            <span>
                              <ShoppingCartIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="text-xxs sm:text-xs p-1"
                      >
                        Buy it Now
                        <span>
                          <CreditCardIcon className="ml-1 -3 w-3 sm:h-4 sm:w-4" />
                        </span>
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
