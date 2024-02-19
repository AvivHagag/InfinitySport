"use client";
import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavigationAccordionProps {
  setImdobileMenuOpen: (open: boolean) => void;
}

const NavigationAccordion: React.FC<NavigationAccordionProps> = ({
  setImdobileMenuOpen,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Home fitness equipment</AccordionTrigger>
        <AccordionContent>aaaaa</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Dumbbells and bars</AccordionTrigger>
        <AccordionContent>bbbbbb</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Stands & Facilities</AccordionTrigger>
        <AccordionContent>
          <Link
            className="underline font-medium text-md"
            href="/stand&facilities/"
          >
            <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
              Stands & Facilities
            </div>
          </Link>
          <Link href="/stand&facilities/dumbbellrack">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Dumbbell Rack
            </div>
          </Link>
          <Link href="/stand&facilities/stands&racks">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Stands & Racks
            </div>
          </Link>
          <Link href="/stand&facilities/storagefacilities">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Storage Facilities
            </div>
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default NavigationAccordion;
