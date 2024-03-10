import React, { useState, useEffect } from "react";
import { getProductsDetails, getUserCart } from "../ServerAction/ServerAction";
import { CartItem, Product } from "@prisma/client";
import ProgressDemo from "./ProgressDemo";
import ProductList from "./ProductList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/src/components/ui/button";

const ShoppingCartDetails = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [ProductDetails, setProductDetails] = useState<Product[]>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [FlagNoItems, setFlagNoItems] = useState<boolean>(false);
  const fetchCartItems = async () => {
    const items = await getUserCart();
    if (!items) {
      setFlagNoItems(true);
      return;
    }
    setCartItems(items);
    if (items) {
      const cartItemIds = items.map((item) => item.productId);
      const Details = await getProductsDetails(cartItemIds);
      setProductDetails(Details);
      const SumPrice = Details
        ? Details.reduce((acc, item) => {
            const cartItem = items.find((ci) => ci.productId === item.id);
            const actualPrice =
              item.onSale && item.salePercent
                ? (item.price * (100 - item.salePercent)) / 100
                : item.price;
            const itemTotal = actualPrice * (cartItem ? cartItem.quantity : 0);
            return acc + itemTotal;
          }, 0)
        : 0;
      setTotalPrice(SumPrice);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (!cartItems) {
    return (
      <>
        {FlagNoItems ? (
          <div className="mx-2 text-base">The Cart Is Empty ..</div>
        ) : (
          <div className="mx-2 text-base">Loading cart items...</div>
        )}{" "}
      </>
    );
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          {totalPrice && <ProgressDemo totalPrice={totalPrice} />}
          {ProductDetails && (
            <>
              <ScrollArea className="h-4/5 sm:h-[400px] w-full border-t pr-1 mb-1">
                <div className="flex flex-col flex- justify-center px-1">
                  {ProductDetails.map((product) => (
                    <ProductList
                      key={product.id}
                      product={product}
                      CartItems={cartItems}
                      fetchCartItems={fetchCartItems}
                    />
                  ))}
                </div>
              </ScrollArea>
              <div className="fixed bottom-[-2px] left-1/2 transform -translate-x-1/2 w-[24.5rem] h-36 py-2 border bg-white dark:bg-slate-950 rounded-2xl">
                <div className="flex flex-col space-y-1 mx-8 my-2">
                  <div className="flex justify-between mx-2">
                    <div className="text-sm">Sub-Total</div>
                    <div className="text-sm">{totalPrice}$</div>
                  </div>
                  <div className="flex justify-between mx-2">
                    <div className="text-sm">Shipping</div>
                    {totalPrice && totalPrice >= 250 ? (
                      <div className="text-sm">Free Shipping !</div>
                    ) : (
                      <div className="text-sm">{15}$</div>
                    )}
                  </div>
                  <div className="h-[0.5px] bg-black dark:bg-current" />
                  <div className="flex justify-between mx-2">
                    <div className="text-base font-medium text-naivyBlue dark:text-glowGreen">
                      Total
                    </div>
                    {totalPrice && totalPrice >= 250 ? (
                      <div className="text-base font-medium text-naivyBlue dark:text-glowGreen">
                        {totalPrice}$
                      </div>
                    ) : (
                      <div className="text-base font-medium text-naivyBlue dark:text-glowGreen">
                        {totalPrice && totalPrice + 15}$
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="text-naivyBlue dark:text-glowGreen hover:text-naivyBlue hover:dark:text-glowGreen"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-sm text-center">The Cart Is Empty ..</div>
      )}
    </>
  );
};

export default ShoppingCartDetails;
