"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavigationComponent = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home fitness equipment</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] text-base">
              <li>aaaaa</li>
              <li>bbbbb</li>
              <li>ccccc</li>
              <li>ddddd</li>
              <li>eeeee</li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dumbbells and bars</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-base">
              bbbbb
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Stands & Facilities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex justify-center underline font-medium text-md pt-2">
              <Link href="/stand&facilities/">Stands & Facilities</Link>
            </div>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-base ">
              <li>
                <Link href="/stand&facilities/dumbbellrack">Dumbbell Rack</Link>
              </li>
              <li>
                <Link href="/stand&facilities/stands&racks">
                  Stands & Racks
                </Link>
              </li>
              <li>
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
