"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import VisaLogo from "@/app/paymentpage/CardLogos/visa.png";

type CreditCardInfo = {
  last4Digits: string;
  year: number;
  month: number;
};

interface CreditCardsProps {
  UserCreditCards: CreditCardInfo[];
}
const CreditCards: React.FC<CreditCardsProps> = ({ UserCreditCards }) => {
  return (
    <>
      {UserCreditCards ? (
        <>
          <div className="w-full sm:w-4/5 mx-auto my-4 px-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-naivyBlue dark:text-glowGreen">
                  Click here to see payment methods
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap justify-center items-center">
                    {UserCreditCards.map((card, index) => (
                      <div key={index} className="m-1">
                        <Button
                          variant={"outline"}
                          className="flex flex-row items-center border py-8"
                          // onClick={() => handlePayment("Saved Credit Card")}
                        >
                          <Image
                            src={VisaLogo}
                            alt="VisaLogo"
                            width={40}
                            height={40}
                            className="invert dark:invert-0 ml-2 mr-8 sm:scale-125 lg:scale-150"
                          />
                          <div className="flex flex-col items-start text-black dark:text-white text-xxs sm:text-xs lg:text-sm mr-2">
                            <div>4 Digits: {card.last4Digits}</div>
                            <div>
                              Exp: {card.month}/{card.year}
                            </div>
                          </div>
                          <Button
                            variant={"outline"}
                            className="ml-2 hover:bg-red-600 text-red-600 hover:text-white border border-red-500"
                          >
                            Delete
                          </Button>
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      ) : null}
    </>
  );
};
export default CreditCards;
