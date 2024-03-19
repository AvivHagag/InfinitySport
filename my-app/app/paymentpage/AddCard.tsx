import React from "react";
import Image from "next/image";
import VisaLogo from "./CardLogos/visa.png";
import MasterCardLogo from "./CardLogos/mastercard.png";
import ChipLogo from "./CardLogos/chip.png";
import WifiLogo from "./CardLogos/wifi.png";
function AddCard() {
  return (
    <div
      className={`p-5 w-96 h-56 bg-[url('https://i.ibb.co/kqbyTdP/glass-Effect.png')] bg-left rounded-xl shadow-2xl shadow-gray-700 flex flex-col justify-between backdrop-blur-lg my-2 mx-auto`}
    >
      <div className="flex justify-between">
        <Image
          src={MasterCardLogo}
          alt="Master Card Logo"
          width={50}
          height={50}
          className="invert"
        />
        <Image
          src={VisaLogo}
          alt="Visa Logo"
          width={100}
          height={100}
          className="scale-75 h-12"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium text-white">
          **** **** **** ****
        </div>
        <Image
          src={WifiLogo}
          alt="Wifi Logo"
          width={50}
          height={50}
          className="invert"
        />
      </div>

      <div className="text-white">
        <div className="flex justify-between items-center mt-4">
          <span>EXP: 12/34</span>
          <span>CVV: 123</span>
          <Image
            src={ChipLogo}
            alt="Chip Logo"
            width={30}
            height={30}
            className="invert"
          />
        </div>
      </div>
    </div>
  );
}

export default AddCard;
