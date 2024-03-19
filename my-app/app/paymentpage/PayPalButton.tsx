import { Button } from "@/src/components/ui/button";
import React from "react";
import Image from "next/image";
import Paypal from "./PaypalLogos/Paypal.png";
import PaypalWhite from "./PaypalLogos/PaypalWhite.png";

const PayPalButton = () => {
  return (
    <Button
      variant={"outline"}
      className="py-6"
      onClick={() => {
        console.log("Pay with PayPal");
      }}
    >
      <div className="block dark:hidden">
        <Image
          src={Paypal}
          alt={"logo"}
          width={180}
          height={180}
          className="m-2"
        />
      </div>
      <div className="hidden dark:block">
        <Image
          src={PaypalWhite}
          alt={"logoBlack"}
          width={180}
          height={180}
          className="m-2"
        />
      </div>
    </Button>
  );
};

export default PayPalButton;
