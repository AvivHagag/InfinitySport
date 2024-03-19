import { Button } from "@/src/components/ui/button";
import React from "react";
import Image from "next/image";
import Paypal from "./PaypalLogos/Paypal.png";
import PaypalBlack from "./PaypalLogos/paypalblack.png";
const PayPalButton = () => {
  return (
    <Button
      className="border rounded-lg bg-white dark:bg-glowGreen py-8"
      onClick={() => {
        console.log("Pay with PayPal");
      }}
    >
      {/* <div className="block dark:hidden"> */}
      <Image
        src={Paypal}
        alt={"logo"}
        width={200}
        height={200}
        className="m-2"
      />
      {/* </div>
      <div className="hidden dark:block">
        <Image
          src={PaypalBlack}
          alt={"logoBlack"}
          width={200}
          height={200}
          className="m-2"
        />
      </div> */}
    </Button>
  );
};

export default PayPalButton;
