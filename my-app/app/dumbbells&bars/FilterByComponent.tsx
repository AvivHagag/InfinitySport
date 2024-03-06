import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Label } from "@/src/components/ui/label";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useTheme } from "next-themes";

type FilterByComponentProps = {
  allColors: string[];
  selectedColors: string[];
  handleColorChange: (color: string) => void;
  selectedCategories: number[];
  handleCategoriesChange: (categoryId: number, flag: boolean) => void;
  SelectHandWeights: boolean;
  setSelectHandWeights: (value: boolean) => void;
  SelectPlateWeights: boolean;
  setSelectPlateWeights: (value: boolean) => void;
  SelectAnkleWeights: boolean;
  setSelectAnkleWeights: (value: boolean) => void;
  SelectKettlebellWeights: boolean;
  setSelectKettlebellWeights: (value: boolean) => void;
  SelectGymBarbell: boolean;
  setSelectGymBarbell: (value: boolean) => void;
  onSale: boolean;
  handleOnSaleChange: () => void;
  tempMinPrice: number;
  tempMaxPrice: number;
  handleSliderChange: (values: number | number[]) => void;
  minPrice: number;
  MinPrice: number;
  MaxPrice: number;
  maxPrice: number;
};

const FilterByComponent: React.FC<FilterByComponentProps> = ({
  allColors,
  selectedColors,
  handleColorChange,
  selectedCategories,
  handleCategoriesChange,
  SelectHandWeights,
  setSelectHandWeights,
  SelectPlateWeights,
  setSelectPlateWeights,
  SelectAnkleWeights,
  setSelectAnkleWeights,
  SelectKettlebellWeights,
  setSelectKettlebellWeights,
  SelectGymBarbell,
  setSelectGymBarbell,
  onSale,
  handleOnSaleChange,
  tempMinPrice,
  tempMaxPrice,
  handleSliderChange,
  MinPrice,
  minPrice,
  MaxPrice,
  maxPrice,
}) => {
  const { theme } = useTheme();
  return (
    <>
      <h2 className="mt-4 mx-2 w-52 text-naivySky dark:text-glowGreen font-medium">
        {" "}
        Filter By:
      </h2>
      <Accordion type="single" collapsible className="px-1 mx-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Categories :</AccordionTrigger>
          <AccordionContent className="pb-0">
            <input
              id="SelectHandWeights"
              type="checkbox"
              name="SelectHandWeights"
              checked={SelectHandWeights || false}
              onChange={() => {
                setSelectHandWeights(!SelectHandWeights);
                handleCategoriesChange(6, !SelectHandWeights);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Hand Weights</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectPlateWeights"
              type="checkbox"
              name="SelectPlateWeights"
              checked={SelectPlateWeights || false}
              onChange={() => {
                setSelectPlateWeights(!SelectPlateWeights);
                handleCategoriesChange(7, !SelectPlateWeights);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Plate Weights</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectAnkleWeights"
              type="checkbox"
              name="SelectAnkleWeights"
              checked={SelectAnkleWeights || false}
              onChange={() => {
                setSelectAnkleWeights(!SelectAnkleWeights);
                handleCategoriesChange(8, !SelectAnkleWeights);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Ankle Weights</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectKettlebellWeights"
              type="checkbox"
              name="SelectKettlebellWeights"
              checked={SelectKettlebellWeights || false}
              onChange={() => {
                setSelectKettlebellWeights(!SelectKettlebellWeights);
                handleCategoriesChange(9, !SelectKettlebellWeights);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Kettlebell Weights</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectGymBarbell"
              type="checkbox"
              name="SelectGymBarbell"
              checked={SelectGymBarbell || false}
              onChange={() => {
                setSelectGymBarbell(!SelectGymBarbell);
                handleCategoriesChange(10, !SelectGymBarbell);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Gym Barbell</Label>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Colors :</AccordionTrigger>
          <AccordionContent>
            {allColors.map((color) => (
              <div key={color} className="flex items-center">
                <input
                  id={`Select${color.replace(/\s/g, "")}`}
                  type="checkbox"
                  name={`Select${color.replace(/\s/g, "")}`}
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="w-3 h-3 m-1"
                />
                <Label className="text-sm capitalize">{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex my-2">
        <div className="flex flex-col w-full m-1 mx-2">
          <label className="text-sm">On Sale:</label>
          <div className="flex items-center w-full px-2">
            <input
              id="SelectOnSale"
              type="checkbox"
              name="SelectOnSale"
              checked={onSale}
              onChange={handleOnSaleChange}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Sale</Label>
          </div>
        </div>
      </div>
      <div className="flex border-t shadow-2xl shadow-gray-400 dark:shadow-slate-800 my-2">
        <div className="flex flex-col w-full m-1 mx-2">
          <label className="text-sm">Price Range:</label>
          <div className="flex items-center w-full px-1">
            <span className="mr-2 text-base">${tempMinPrice}</span>
            <Slider
              range={true}
              min={MinPrice}
              max={MaxPrice}
              defaultValue={[minPrice, maxPrice]}
              onChange={handleSliderChange}
              className="w-full"
              trackStyle={[
                {
                  backgroundColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                },
              ]}
              handleStyle={[
                {
                  backgroundColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                  borderColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                },
                {
                  backgroundColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                  borderColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                },
              ]}
            />
            <span className="ml-2 text-base">${tempMaxPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterByComponent;
