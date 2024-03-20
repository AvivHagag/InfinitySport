"use client";
import React, { SetStateAction, useState } from "react";
import { Separator } from "@/components/ui/separator";
import PayPalButton from "./PayPalButton";
import AddCard from "./AddCard";
import CardDetails from "./CardDetails";

type PaymentDetailsProps = {
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
  cardNumber: string;
  Cvv: string;
  Exp: string;
  setCardNumber: React.Dispatch<SetStateAction<string>>;
  setCvv: React.Dispatch<SetStateAction<string>>;
  setExp: React.Dispatch<SetStateAction<string>>;
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  setCurrentLevel,
  cardNumber,
  Cvv,
  Exp,
  setCardNumber,
  setCvv,
  setExp,
}) => {
  return (
    <div className="flex justify-center mx-auto p-1 sm:p-4 w-full lg:w-3/4 border rounded-xl">
      <div className="text-xs sm:text-sm md:text-base w-full">
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
              />
            </div>
            <Separator
              orientation="vertical"
              className="h-auto mx-2 hidden sm:block"
            />
            <div className="flex justify-center items-center mx-auto w-2/5 py-8 sm:py-0">
              <PayPalButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
