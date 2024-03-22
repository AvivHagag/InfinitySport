"use client";
import React, { SetStateAction, useState } from "react";
import { Separator } from "@/components/ui/separator";
import PayPalButton from "./PayPalButton";
import AddCard from "./AddCard";
import CardDetails from "./CardDetails";
import { CartItem, Order } from "@prisma/client";
import ClipLoader from "react-spinners/ClipLoader";
import { getSession } from "next-auth/react";
import { createOrderAndClearCart } from "../ServerAction/ServerAction";

type Address = {
  state: String;
  city: String;
  street: String;
  homeNumber: number;
  apartmentNumber: number;
};

type PaymentDetailsProps = {
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
  cardNumber: string;
  Cvv: string;
  Exp: string;
  setCardNumber: React.Dispatch<SetStateAction<string>>;
  setCvv: React.Dispatch<SetStateAction<string>>;
  setExp: React.Dispatch<SetStateAction<string>>;
  totalPrice: number;
  cartItems: CartItem[];
  Address: Address;
  setConfirmationDetails: React.Dispatch<SetStateAction<Order | undefined>>;
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  setCurrentLevel,
  cardNumber,
  Cvv,
  Exp,
  setCardNumber,
  setCvv,
  setExp,
  totalPrice,
  cartItems,
  Address,
  setConfirmationDetails,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePayment = async (PaymentMethod: string) => {
    setIsLoading(true);
    if (PaymentMethod === "Credit card") {
    }
    if (await getSession()) {
      try {
        const NewOrder = await createOrderAndClearCart(
          totalPrice,
          PaymentMethod
        );
        setConfirmationDetails(NewOrder);
      } catch (e) {
        console.error(e, "Failed to create order and clear cart");
        return;
      }
      setCurrentLevel("Confirmation");
    } else {
      console.log("guest");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex justify-center mx-auto p-1 sm:p-4 w-full lg:w-3/4 border rounded-xl">
      <div className="text-xs sm:text-sm md:text-base w-full">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center justify-center pb-2 space-x-2">
            <p className="text-naivyBlue dark:text-glowGreen text-xl sm:text-2xl pt-32">
              Processing ..
            </p>
            <ClipLoader
              color="#FFFFFF dark:#9ffd32"
              className="text-naivyBlue dark:text-glowGreen mb-32"
              size={50}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex flex-col py-2 sm:py-0 sm:flex-row justify-between">
                <div className="flex flex-col w-full sm:w-3/5 items-center justify-center mx-auto bg-naivySky dark:bg-slate-950 rounded-2xl">
                  <div className="flex w-4/5">
                    <AddCard cardNumber={cardNumber} Cvv={Cvv} Exp={Exp} />
                  </div>
                  <CardDetails
                    cardNumber={cardNumber}
                    Cvv={Cvv}
                    Exp={Exp}
                    setCardNumber={setCardNumber}
                    setCvv={setCvv}
                    setExp={setExp}
                    setCurrentLevel={setCurrentLevel}
                    handlePayment={handlePayment}
                  />
                </div>
                <Separator
                  orientation="vertical"
                  className="h-auto mx-2 hidden sm:block"
                />
                <div className="flex justify-center items-center mx-auto w-2/5 py-8 sm:py-0">
                  <PayPalButton
                    totalPrice={totalPrice}
                    handlePayment={handlePayment}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
