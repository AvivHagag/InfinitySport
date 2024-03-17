import React from "react";

type TitleLevelProps = {
  currentLevel: number;
};

const TitleLevel = ({ currentLevel }: TitleLevelProps) => {
  return (
    <div className="flex justify-center mx-auto px-2 sm:px-4 py-1 sm:py-2 w-full">
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-500 text-xs sm:text-sm md:text-base w-full sm:w-5/6">
        <div
          className={`pb-2 ${
            currentLevel === 0
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Your Order
        </div>
        <div
          className={`pb-2 ${
            currentLevel === 1
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Shipping Details
        </div>
        <div
          className={`pb-2 ${
            currentLevel === 2
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Payment Details
        </div>
        <div
          className={`pb-2 ${
            currentLevel === 3
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Confirmation
        </div>
      </div>
    </div>
  );
};
export default TitleLevel;
