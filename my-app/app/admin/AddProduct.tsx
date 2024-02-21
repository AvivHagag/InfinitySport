"use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState } from "react";

// export default function AddProduct() {
//   const [name, setName] = useState<string>();
//   return (
//     <div className="max-w-sm rounded shadow-lg p-5 dark:shadow-gray-700">
//       <div className="mb-4 space-y-2">
//         <Label className="text-base">Name</Label>
//         <Input
//           id="name"
//           type="text"
//           name="name"
//           value={name}
//           // onChange={handleChange}
//         />
//         <div className="flex items-center justify-center pt-4">
//           <Button variant={"outline"} type="submit">
//             Add Product
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { GetAllcategories } from "../ServerAction/ServerAction";
import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

export default function AddProduct() {
  const [product, setProduct] = useState<{
    name?: string;
    manufacturer?: string;
    price?: number;
    image?: string;
    description?: string;
    color?: string;
    categoryId?: number;
    size?: string;
    quantity?: number;
    onSale?: boolean;
    salePercent?: number;
  }>({});
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }> | undefined
  >([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting product:", product);
    // Here you would typically send the product data to your backend
  };

  useEffect(() => {
    const FetchAllCategories = async () => {
      const data = await GetAllcategories();
      setCategories(data);
    };
    FetchAllCategories();
    console.log(value);
  }, [value]);
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm rounded shadow-lg p-5 dark:shadow-gray-700"
    >
      <div className="flex flex-col mb-4 space-y-2">
        <Label className="text-base">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        {/* Repeat similar blocks for each field in your product schema */}
        <Label className="text-base">Manufacturer</Label>
        <Input
          id="manufacturer"
          type="text"
          name="manufacturer"
          value={product.manufacturer}
          onChange={handleChange}
        />

        <Label className="text-base">Price</Label>
        <Input
          id="price"
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <Label className="text-base">Catgory </Label>

        {categories ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value ? value : "Select framework..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {category.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === category.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : //   <Popover open={open} onOpenChange={setOpen}>
        //     <PopoverTrigger asChild>
        //       <Button
        //         variant="outline"
        //         role="combobox"
        //         aria-expanded={open}
        //         className="w-[200px] justify-between"
        //       >
        //         {value
        //           ? categories.find((category) => category.name === value)?.name
        //           : "Select a category..."}
        //         <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        //       </Button>
        //     </PopoverTrigger>
        //     <PopoverContent className="w-[200px] p-0">
        //       <Command>
        //         <CommandInput
        //           placeholder="Search category..."
        //           className="h-9"
        //         />
        //         <CommandEmpty>No category found.</CommandEmpty>
        //         <CommandGroup>
        //           {categories &&
        //             categories.map((category) => (
        //               <CommandItem
        //                 key={category.id}
        //                 value={category.name}
        //                 onSelect={(currentValue) => {
        //                   console.log("Selected value before update:", value);
        //                   setValue(currentValue === value ? "" : currentValue);
        //                   console.log(
        //                     "Selected value after update:",
        //                     currentValue
        //                   );
        //                   setOpen(false);
        //                 }}
        //               >
        //                 {category.name}
        //                 <CheckIcon
        //                   className={cn(
        //                     "ml-auto h-4 w-4",
        //                     value === category.name
        //                       ? "opacity-100"
        //                       : "opacity-0"
        //                   )}
        //                 />
        //               </CommandItem>
        //             ))}
        //         </CommandGroup>
        //       </Command>
        //     </PopoverContent>
        //   </Popover>
        null}
        <div className="flex items-center justify-center pt-4">
          <Button variant={"outline"} type="submit">
            Add Product
          </Button>
        </div>
      </div>
    </form>
  );
}
