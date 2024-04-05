"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import InsertAddress from "./InsertAddress";
import { Zoom } from "react-awesome-reveal";

type Address = {
  state: string;
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
};

interface AddressProps {
  UserAddress: Address | null | undefined;
}
const Address: React.FC<AddressProps> = ({ UserAddress }) => {
  const [EditAddress, setEditAddress] = useState<boolean>(false);

  const handleEditAddress = () => {
    setEditAddress(!EditAddress);
  };

  return (
    <>
      {!EditAddress ? (
        <>
          <div className="text-center text-xs sm:text-base sm:text-xl py-4 text-naivyBlue dark:text-glowGreen">
            Address
          </div>
          <div className="flex justify-center items-center w-full sm:w-3/4 mx-auto">
            <div className="flex justify-between border p-3 rounded-lg w-full">
              <div className="flex flex-col space-y-1">
                <Label className="text-xs sm:text-base">
                  State: {UserAddress?.state}
                </Label>
                <Label className="text-xs sm:text-base">
                  city: {UserAddress?.city}
                </Label>
                <Label className="text-xs sm:text-base">
                  Street: {UserAddress?.street}
                </Label>
              </div>
              <div className="flex flex-col space-y-1">
                <Label className="text-xs sm:text-base ">
                  Home Number: {UserAddress?.homeNumber}
                </Label>
                <Label className="text-xs sm:text-base">
                  Apartment Number: {UserAddress?.apartmentNumber}
                </Label>
              </div>
              <div className="flex flex-col space-y-1">
                <Button
                  variant={"outline"}
                  className="text-xs sm:text-base"
                  onClick={() => handleEditAddress()}
                >
                  Edit
                </Button>
                <Button
                  variant={"outline"}
                  className="text-xs sm:text-base hover:bg-red-600 text-red-600 hover:text-white border border-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {UserAddress ? (
            <Zoom>
              <InsertAddress
                UserAddress={UserAddress}
                handleEditAddress={handleEditAddress}
              />
            </Zoom>
          ) : null}
        </>
      )}
    </>
  );
};
export default Address;
