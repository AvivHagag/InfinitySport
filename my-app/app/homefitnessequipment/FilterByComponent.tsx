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
  SelectTreadmill: boolean;
  setSelectTreadmill: (value: boolean) => void;
  SelectCrossOver: boolean;
  setSelectCrossOver: (value: boolean) => void;
  SelectRowingMachine: boolean;
  setSelectRowingMachine: (value: boolean) => void;
  SelectMultiTrainer: boolean;
  setSelectMultiTrainer: (value: boolean) => void;
  SelectExerciseBike: boolean;
  setSelectExerciseBike: (value: boolean) => void;
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
  SelectTreadmill,
  setSelectTreadmill,
  SelectCrossOver,
  setSelectCrossOver,
  SelectRowingMachine,
  setSelectRowingMachine,
  SelectMultiTrainer,
  setSelectMultiTrainer,
  SelectExerciseBike,
  setSelectExerciseBike,
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
              id="SelectTreadmill"
              type="checkbox"
              name="SelectTreadmill"
              checked={SelectTreadmill || false}
              onChange={() => {
                setSelectTreadmill(!SelectTreadmill);
                handleCategoriesChange(1, !SelectTreadmill);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Treadmill</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectCrossOver"
              type="checkbox"
              name="SelectCrossOver"
              checked={SelectCrossOver || false}
              onChange={() => {
                setSelectCrossOver(!SelectCrossOver);
                handleCategoriesChange(2, !SelectCrossOver);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Cross Over</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectRowingMachine"
              type="checkbox"
              name="SelectRowingMachine"
              checked={SelectRowingMachine || false}
              onChange={() => {
                setSelectRowingMachine(!SelectRowingMachine);
                handleCategoriesChange(3, !SelectRowingMachine);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Rowing Machine</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectMultiTrainer"
              type="checkbox"
              name="SelectMultiTrainer"
              checked={SelectMultiTrainer || false}
              onChange={() => {
                setSelectMultiTrainer(!SelectMultiTrainer);
                handleCategoriesChange(4, !SelectMultiTrainer);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Multi Trainer</Label>
          </AccordionContent>
          <AccordionContent className="pb-0">
            <input
              id="SelectExerciseBike"
              type="checkbox"
              name="SelectExerciseBike"
              checked={SelectExerciseBike || false}
              onChange={() => {
                setSelectExerciseBike(!SelectExerciseBike);
                handleCategoriesChange(5, !SelectExerciseBike);
              }}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Exercise Bike</Label>
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
