"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Product } from "@prisma/client";
import { Label } from "@/src/components/ui/label";

type FilterComponentProps = {
  sortedProducts: Product[];
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function FilterComponent({
  sortedProducts,
  setSortedProducts,
}: FilterComponentProps) {
  const [sortDefault, setSortDefault] = useState<Product[]>(sortedProducts);
  const [SelectTreadmill, setSelectTreadmill] = useState<boolean>(false);
  const [SelectRowingMachine, setSelectRowingMachine] =
    useState<boolean>(false);
  const [SelectCrossOver, setSelectCrossOver] = useState<boolean>(false);
  const [SelectExerciseBike, setSelectExerciseBike] = useState<boolean>(false);
  const [SelectMultiTrainer, setSelectMultiTrainer] = useState<boolean>(false);
  const [updateCategories, setUpdateCategories] = useState<number[]>([]);

  const handleCategoriesChange = (option: string, flag: boolean) => {
    let selectedCategories = [...updateCategories];
    let sortedProductsCopy = [...sortDefault];
    switch (option) {
      case "SelectTreadmill":
        if (flag) {
          selectedCategories = [...selectedCategories, 1];
        } else {
          const index = selectedCategories.indexOf(1);
          if (index !== -1) {
            selectedCategories.splice(index, 1);
          }
        }
        break;
      case "SelectCrossOver":
        if (flag) {
          selectedCategories = [...selectedCategories, 2];
        } else {
          const index = selectedCategories.indexOf(2);
          if (index !== -1) {
            selectedCategories.splice(index, 1);
          }
        }
        break;
      case "SelectRowingMachine":
        if (flag) {
          selectedCategories = [...selectedCategories, 3];
        } else {
          const index = selectedCategories.indexOf(3);
          if (index !== -1) {
            selectedCategories.splice(index, 1);
          }
        }
        break;
      case "SelectMultiTrainer":
        if (flag) {
          selectedCategories = [...selectedCategories, 4];
        } else {
          const index = selectedCategories.indexOf(4);
          if (index !== -1) {
            selectedCategories.splice(index, 1);
          }
        }
        break;
      case "SelectExerciseBike":
        if (flag) {
          selectedCategories = [...selectedCategories, 5];
        } else {
          const index = selectedCategories.indexOf(5);
          if (index !== -1) {
            selectedCategories.splice(index, 1);
          }
        }
        break;
    }
    if (selectedCategories.length > 0) {
      sortedProductsCopy = sortedProductsCopy.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
      setSortedProducts(sortedProductsCopy);
      setUpdateCategories(selectedCategories);
    } else {
      setSortedProducts(sortDefault);
    }
  };

  return (
    <>
      <div className="flex border shadow-xl dark:shadow-slate-800 w-auto rounded my-2 hidden sm:block">
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
                  handleCategoriesChange("SelectTreadmill", !SelectTreadmill);
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
                  handleCategoriesChange("SelectCrossOver", !SelectCrossOver);
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
                  handleCategoriesChange(
                    "SelectRowingMachine",
                    !SelectRowingMachine
                  );
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
                  handleCategoriesChange(
                    "SelectMultiTrainer",
                    !SelectMultiTrainer
                  );
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
                  handleCategoriesChange(
                    "SelectExerciseBike",
                    !SelectExerciseBike
                  );
                }}
                className="w-3 h-3 m-1"
              />
              <Label className="text-sm">Exercise Bike</Label>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
