"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import NavigationComponent from "./NavigationComponent";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import NavigationAccordion from "./NavigationAccordion";

const LogoChooseNoSSR = dynamic(() => import("./LogoChoose"), {
  ssr: false,
});

const Navbarcontent = () => {
  const [imdobileMenuOpen, setImdobileMenuOpen] = useState(false);
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setImdobileMenuOpen(!imdobileMenuOpen)}
          className="md:hidden mr-2 z-40"
        >
          {imdobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
        <div className="hidden md:flex flex-row items-center space-x-1">
          <LogoChooseNoSSR />
          <NavigationComponent />
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white dark:bg-slate-950 p-8 z-20 md:hidden transition-transform ${
          imdobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center">
          <div
            className="mx-auto pb-2"
            onClick={() => setImdobileMenuOpen(false)}
          >
            <LogoChooseNoSSR />
          </div>{" "}
          <NavigationAccordion setImdobileMenuOpen={setImdobileMenuOpen} />
        </div>
      </div>
    </>
  );
};

export default Navbarcontent;
