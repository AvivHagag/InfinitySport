"use client";
import { CartItem, Product } from "@prisma/client";
import React, { SetStateAction } from "react";
import ProductDetails from "./ProductDetails";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/src/components/ui/button";
import {
  ArrowUturnLeftIcon,
  FlagIcon,
  GlobeAltIcon,
  HomeIcon,
  LifebuoyIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import PayPalButton from "./PayPalButton";

type Address = {
  state: String;
  city: String;
  street: String;
  homeNumber: number;
  apartmentNumber: number;
};

type PaymentDetailsProps = {
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ setCurrentLevel }) => {
  return (
    <div className="flex justify-center mx-auto px-2 sm:px-4 py-1 sm:py-2 w-full lg:w-3/4">
      <div className="text-xs sm:text-sm md:text-base w-full sm:w-5/6">
        <div className="flex flex-col">
          <div className="flex justify-between h-96">
            <div className="flex flex-col w-3/5"> a</div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex justify-center items-center w-2/5">
              <PayPalButton />
            </div>
          </div>
          <div className="flex justify-between py-8">
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
