import React from "react";
import SigninButton from "./SignInButton";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import SearchButton from "./SearchButton";
import Navbarcontent from "./Navbarcontent";

const NavBar = () => {
  return (
    <header className="flex px-2">
      <div className="flex justify-between items-center w-full">
        <Navbarcontent />
        <div className="flex flex-row items-center">
          <SearchButton />
          <ShoppingCartIcon className="h-5 w-5 m-1 cursor-pointer hover:animate-spin-once" />
          <SigninButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
