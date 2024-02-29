"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu";

const NavigationComponent = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home Fitness Equipment</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-center underline font-medium text-md pt-2 hover:scale-105 hover:text-naivyBlue dark:hover:text-glowGreen">
              <Link href="/homefitnessequipment/">Home Fitness Equipment</Link>
            </div>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-base ">
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/homefitnessequipment/treadmill">Treadmill</Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/homefitnessequipment/exercisebike">
                  Exercise Bike
                </Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/homefitnessequipment/rowingmachine">
                  Rowing machine
                </Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/homefitnessequipment/multitrainer">
                  Multi trainer
                </Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/homefitnessequipment/crossover">Cross over</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dumbbells & Bars</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-center underline font-medium text-md pt-2 hover:scale-105 hover:text-naivyBlue dark:hover:text-glowGreen">
              <Link href="/dumbbells&bars/">Dumbbells & bars</Link>
            </div>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-base ">
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/dumbbells&bars/handweights">Hand Weights</Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/dumbbells&bars/kettlebellweights">
                  Kettlebell Weights
                </Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/dumbbells&bars/plateweights">Plate Weights</Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/dumbbells&bars/gymbarbell">Gym Barbell</Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/dumbbells&bars/ankleweights">Ankle Weights</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Stands & Facilities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-center underline font-medium text-md pt-2 hover:scale-105 hover:text-naivyBlue dark:hover:text-glowGreen">
              <Link href="/stand&facilities/">Stands & Facilities</Link>
            </div>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-base ">
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/stand&facilities/dumbbellrack">Dumbbell Rack</Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/stand&facilities/stands&racks">
                  Stands & Racks
                </Link>
              </li>
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <Link href="/stand&facilities/storagefacilities">
                  Storage Facilities
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default NavigationComponent;
