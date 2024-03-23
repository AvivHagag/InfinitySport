"use client";
import React, { useEffect, useState } from "react";
import TitleLevel from "./TitleLevel";
import { CartItem, Order, Product } from "@prisma/client";
import {
  getAddress,
  getProductsDetails,
  getUserCart,
} from "../ServerAction/ServerAction";
import { getSession } from "next-auth/react";
import YourOrder from "./YourOrder";
import PaymentDetails from "./PaymentDetails";
import ConfirmationPage from "./ConfirmationPage";

type Address = {
  state: String;
  city: String;
  street: String;
  homeNumber: number;
  apartmentNumber: number;
};

export default function MainPaymentComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [currentLevel, setCurrentLevel] = useState<string>("OrderDetails");
  const [ConfirmationDetails, setConfirmationDetails] = useState<Order>();
  const [ProductsDetails, setProductsDetails] = useState<Product[]>();
  const [Address, setAddress] = useState<Address>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [FlagNoItems, setFlagNoItems] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [Exp, setExp] = useState<string>("");
  const [Cvv, setCvv] = useState<string>("");

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

  return (
    <div className="flex flex-col w-full border rounded-xl">
      <TitleLevel currentLevel={currentLevel} />
      {currentLevel === "OrderDetails" &&
        ProductsDetails &&
        totalPrice &&
        cartItems &&
        Address &&
        Address.state && (
          <YourOrder
            ProductsDetails={ProductsDetails}
            totalPrice={totalPrice}
            cartItems={cartItems}
            Address={Address}
            setCurrentLevel={setCurrentLevel}
          />
        )}
      {currentLevel === "PaymentDetails" &&
        totalPrice &&
        cartItems &&
        Address && (
          <PaymentDetails
            setCurrentLevel={setCurrentLevel}
            cardNumber={cardNumber}
            Cvv={Cvv}
            Exp={Exp}
            setCardNumber={setCardNumber}
            setCvv={setCvv}
            setExp={setExp}
            totalPrice={totalPrice}
            cartItems={cartItems}
            Address={Address}
            setConfirmationDetails={setConfirmationDetails}
          />
        )}
      {currentLevel === "Confirmation" && (
        <ConfirmationPage ConfirmationDetails={ConfirmationDetails} />
      )}
    </div>
  );
}
