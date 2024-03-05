"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Product } from "@prisma/client";
import { Label } from "@/src/components/ui/label";
import { useTheme } from "next-themes";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/src/components/ui/button";

type FilterComponentProps = {
  sortedProducts: Product[];
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function FilterComponent({
  sortedProducts,
  setSortedProducts,
}: FilterComponentProps) {
  const { theme } = useTheme();
  const [sortDefault, setSortDefault] = useState<Product[]>(sortedProducts);
  const [SelectTreadmill, setSelectTreadmill] = useState<boolean>(false);
  const [SelectRowingMachine, setSelectRowingMachine] =
    useState<boolean>(false);
  const [SelectCrossOver, setSelectCrossOver] = useState<boolean>(false);
  const [SelectExerciseBike, setSelectExerciseBike] = useState<boolean>(false);
  const [SelectMultiTrainer, setSelectMultiTrainer] = useState<boolean>(false);
  const minPrice = Math.min(...sortedProducts.map((product) => product.price));
  const maxPrice = Math.max(...sortedProducts.map((product) => product.price));
  const [MinPrice, setMinPrice] = useState<number>(minPrice);
  const [MaxPrice, setMaxPrice] = useState<number>(maxPrice);
  const [tempMinPrice, setTempMinPrice] = useState<number>(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(maxPrice);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [allColors, setAllColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [onSale, setOnSale] = useState<boolean>(false);
  const [ismobileMenuOpen, setSsmobileMenuOpen] = useState(false);
  useEffect(() => {
    filterProducts();
  }, [selectedCategories, selectedColors, tempMinPrice, tempMaxPrice, onSale]);

  const filterProducts = () => {
    let filteredProducts = [...sortDefault];
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedColors.some(
          (color) =>
            product.color && product.color.toLowerCase().includes(color)
        )
      );
    }
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= tempMinPrice && product.price <= tempMaxPrice
    );
    if (onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }
    setSortedProducts(filteredProducts);
  };

  const handleCategoriesChange = (categoryId: number, flag: boolean) => {
    setSelectedCategories((prevCategories) =>
      flag
        ? [...prevCategories, categoryId]
        : prevCategories.filter((id) => id !== categoryId)
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSliderChange = (values: number | number[]) => {
    if (typeof values === "number") {
      setTempMinPrice(values);
      setTempMaxPrice(values);
    } else {
      setTempMinPrice(values[0]);
      setTempMaxPrice(values[1]);
    }
  };

  const handleOnSaleChange = () => {
    setOnSale(!onSale);
  };

  const extractColor = (description: string): string[] => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "black",
      "white",
      "gray",
      "pink",
      "silver",
    ];
    const foundColors: string[] = [];
    const lowercaseDescription = description.toLowerCase();
    for (const color of colors) {
      if (lowercaseDescription.includes(color)) {
        foundColors.push(color);
      }
    }
    return foundColors;
  };

  const extractColorsFromProducts = (products: Product[]): string[] => {
    const colors: string[] = [];
    for (const product of products) {
      if (product.color) {
        const productColors = extractColor(product.color);
        for (const color of productColors) {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        }
      }
    }
    return colors;
  };

  useEffect(() => {
    const extractedColors = extractColorsFromProducts(sortDefault);
    setAllColors(extractedColors);
  }, [sortedProducts]);

  return (
    <>
      <div className="flex md:hidden">
        <div
          onClick={() => setSsmobileMenuOpen(!ismobileMenuOpen)}
          className="md:hidden mr-2 z-50 -mt-9"
        >
          {ismobileMenuOpen ? (
            <XMarkIcon className="fixed top-0 left-0 h-7 w-7" />
          ) : (
            <Button variant="outline">filter </Button>
          )}
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-slate-950 p-8 z-40 block sm:hidden transition-transform ${
          ismobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="m-4 w-52"> Filter By:</h2>
        <Accordion type="single" collapsible className="px-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Categories :</AccordionTrigger>
            <AccordionContent>
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
            <AccordionContent>
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
            <AccordionContent>
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
            <AccordionContent>
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
            <AccordionContent>
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
          <div className="flex flex-col w-full m-1">
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
        <div className="flex border-t shadow-xl dark:shadow-slate-800 my-2">
          <div className="flex flex-col w-full m-1">
            <label className="text-sm">Price Range:</label>
            <div className="flex items-center w-full px-2">
              <span className="mr-2 text-sm">${tempMinPrice}</span>
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
      </div>
      <div className="flex border shadow-xl dark:shadow-slate-800 w-auto rounded my-2 hidden md:block">
        <h2 className="m-4 w-52"> Filter By:</h2>
        <Accordion type="single" collapsible className="px-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Categories :</AccordionTrigger>
            <AccordionContent>
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
            <AccordionContent>
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
            <AccordionContent>
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
            <AccordionContent>
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
            <AccordionContent>
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
          <div className="flex flex-col w-full m-1">
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
        <div className="flex border-t shadow-xl dark:shadow-slate-800 my-2">
          <div className="flex flex-col w-full m-1">
            <label className="text-sm">Price Range:</label>
            <div className="flex items-center w-full px-2">
              <span className="mr-2 text-sm">${tempMinPrice}</span>
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
      </div>
    </>
  );
}
