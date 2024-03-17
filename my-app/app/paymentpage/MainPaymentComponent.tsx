"use client";
import React, { useEffect, useState } from "react";
import TitleLevel from "./TitleLevel";
import { CartItem, Product } from "@prisma/client";
import {
  getAddress,
  getProductsDetails,
  getUserCart,
} from "../ServerAction/ServerAction";
import { getSession } from "next-auth/react";
import YourOrder from "./YourOrder";

type Address = {
  state: String;
  city: String;
  street: String;
  homeNumber: number;
  apartmentNumber: number;
};

export default function MainPaymentComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [ProductsDetails, setProductsDetails] = useState<Product[]>();
  const [Address, setAddress] = useState<Address>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [FlagNoItems, setFlagNoItems] = useState<boolean>(false);

  const fetchCartItems = async () => {
    let items = await getUserCart();
    if (items === null) {
      setFlagNoItems(true);
      return;
    } else if (items === undefined) {
      const storedCartItems = localStorage.getItem("cartItems");
      items = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(items);
    } else {
      setCartItems(items);
    }
    if (items && items.length > 0) {
      const cartItemIds = items.map((item) => item.productId);
      const Details = await getProductsDetails(cartItemIds);
      setProductsDetails(Details);

      const SumPrice = Details
        ? Details.reduce((acc, item) => {
            const cartItem =
              items && items.find((ci) => ci.productId === item.id);
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
      setFlagNoItems(true);
    }
  };

  const fetchAddress = async () => {
    if (await getSession()) {
      const AddressDate = await getAddress();
      if (AddressDate) {
        setAddress(AddressDate);
      }
    } else {
      const storedAddress = localStorage.getItem("userAddress");
      if (storedAddress) {
        setAddress(JSON.parse(storedAddress));
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchAddress();
  }, []);

  useEffect(() => {
    console.log("Address ", Address);
    console.log("cartItems ", cartItems);
    console.log("ProductDetails ", ProductsDetails);
    console.log("totalPrice ", totalPrice);
  }, [Address, cartItems, ProductsDetails, totalPrice]);

  return (
    <div className="flex flex-col w-full border rounded-xl">
      <TitleLevel currentLevel={currentLevel} />
      {currentLevel === 0 && ProductsDetails && totalPrice && cartItems && (
        <YourOrder
          ProductsDetails={ProductsDetails}
          totalPrice={totalPrice}
          cartItems={cartItems}
        />
      )}
      {currentLevel === 1 && "Shipping Details"}
      {currentLevel === 2 && "Payment Details"}
      {currentLevel === 3 && "Confirmation"}
    </div>
  );
}
