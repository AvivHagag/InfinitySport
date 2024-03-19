"use client";
import React, { SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/src/components/ui/button";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import PayPalButton from "./PayPalButton";
import AddCard from "./AddCard";
import CardDetails from "./CardDetails";

type PaymentDetailsProps = {
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ setCurrentLevel }) => {
  return (
    <div className="flex justify-center mx-auto p-1 sm:p-4 w-full lg:w-3/4 border rounded-xl">
      <div className="text-xs sm:text-sm md:text-base w-full">
        <div className="flex flex-col">
          <div className="flex flex-col py-2 sm:py-0 sm:flex-row justify-between">
            <div className="flex flex-col w-full sm:w-3/5 items-center justify-center mx-auto bg-naivySky dark:bg-slate-950 rounded-2xl">
              <div className="flex w-4/5">
                <AddCard />
              </div>
              <CardDetails />
            </div>
            <Separator
              orientation="vertical"
              className="h-auto mx-2 hidden sm:block"
            />
            <div className="flex justify-center items-center mx-auto w-2/5 py-2 sm:py-0">
              <PayPalButton />
            </div>
          </div>
          <div className="flex justify-between pt-2 pb-8">
            <Button
              variant={"outline"}
              className="text-sm sm:text-lg md:text-xl hover:scale-105"
              onClick={() => setCurrentLevel("OrderDetails")}
            >
              <span>
                <ArrowUturnLeftIcon className="h-3 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1" />
              </span>
              Back
            </Button>
            <Button
              variant={"outline"}
              className="text-sm sm:text-lg md:text-xl hover:scale-105 bg-naivyBlue hover:bg-naivyBlue/80 hover:text-white text-white dark:text-black dark:bg-glowGreen dark:hover:bg-glowGreen/70 dark:hover:text-black"
              onClick={() => setCurrentLevel("PaymentDetails")}
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

export default PaymentDetails;
