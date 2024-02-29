"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const SearchButton = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    alert(searchTerm);
  };
  const handleDropdownChange = (open: boolean) => {
    if (open) {
      setSearchTerm("");
    }
  };

  return (
    <>
      <DropdownMenu onOpenChange={handleDropdownChange}>
        <DropdownMenuTrigger asChild>
          <MagnifyingGlassIcon className="h-5 w-5 m-1 cursor-pointer hover:animate-spin-once" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 sm:w-80 mt-1">
          <DropdownMenuLabel>
            <div className="flex flex-row justify-start items-center py-1 px-2 relative">
              <MagnifyingGlassIcon
                className="h-5 w-5 mr-1 sm:mr-2 cursor-pointer"
                onClick={() => handleSearch()}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="search"
                className="border-b border-slate-400 text-xs sm:text-base w-full bg-inherit"
              />
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default SearchButton;
