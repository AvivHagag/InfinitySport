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
        <AccordionContent>
          <Link
            className="underline font-medium text-md"
            href="/homefitnessequipment/"
          >
            <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
              Home Fitness Equipment
            </div>
          </Link>
          <Link href="/homefitnessequipment/treadmill">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Treadmill
            </div>
          </Link>
          <Link href="/homefitnessequipment/exercisebike">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Exercise Bike
            </div>
          </Link>
          <Link href="/homefitnessequipment/rowingmachine">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Rowing machine
            </div>
          </Link>
          <Link href="/homefitnessequipment/multitrainer">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Multi trainer
            </div>
          </Link>
          <Link href="/homefitnessequipment/crossover">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Cross over
            </div>
          </Link>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Dumbbells & bars</AccordionTrigger>
        <AccordionContent>
          <Link
            className="underline font-medium text-md"
            href="/dumbbells&bars/"
          >
            <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
              Dumbbells & bars
            </div>
          </Link>
          <Link href="/dumbbells&bars/handweights">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Hand Weights
            </div>
          </Link>
          <Link href="/dumbbells&bars/kettlebellweights">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Kettlebell Weights
            </div>
          </Link>
          <Link href="/dumbbells&bars/plateweights">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Plate Weights
            </div>
          </Link>
          <Link href="/dumbbells&bars/gymbarbell">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Gym Barbell
            </div>
          </Link>
          <Link href="/dumbbells&bars/ankleweights">
            <div
              className="my-1 text-sm"
              onClick={() => setImdobileMenuOpen(false)}
            >
              Ankle Weights
            </div>
          </Link>
        </AccordionContent>
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
