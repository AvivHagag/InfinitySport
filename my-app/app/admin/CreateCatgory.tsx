"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { CreateNewCatgory } from "../ServerAction/ServerAction";
import ClipLoader from "react-spinners/ClipLoader";

export default function CreateCatgory() {
  const [CatgoryName, setCatgoryName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatgoryName(e.target.value);
  };

  const createCatgoryFunction = async () => {
    setIsLoading(true);
    if (CatgoryName) {
      const craete = await CreateNewCatgory(CatgoryName);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <ClipLoader size={32} color="#000000 dark:#FFFFFF" />
          <p className="text-lg mt-4 text-gray-600">Loading ...</p>
        </div>
      ) : (
        <div className="max-w-sm rounded shadow-lg p-5 dark:shadow-gray-700">
          <div className="mb-4 space-y-2">
            <Label className="text-base">Name</Label>
            <Input
              id="name"
              type="text"
              value={CatgoryName}
              onChange={handleChange}
            />
            <div className="flex items-center justify-center pt-4">
              <Button variant={"outline"} onClick={createCatgoryFunction}>
                Add Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
