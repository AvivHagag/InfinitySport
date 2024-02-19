import React from "react";
import Link from "next/link";
import SigninButton from "./SignInButton";
import LogoChoose from "./LogoChoose";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import SearchButton from "./SearchButton";

const NavBar = () => {
  return (
    <header className="flex px-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row items-center links space-x-2 text-base sm:text-lg">
          <LogoChoose />
          <Link className="hover:text-gray-400 transition-colors" href={"/hey"}>
            User Profile
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            href={"/admin"}
          >
            Admin Dashboard
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <SearchButton />
          <ShoppingCartIcon className="h-5 w-5 m-1 cursor-pointer" />
          <SigninButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
