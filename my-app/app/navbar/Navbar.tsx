import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SigninButton from "./SignInButton";

const NavBar = () => {
  return (
    <header className="flex p-2">
      <div className="flex justify-between w-full">
        <div className="links space-x-2 text-base sm:text-lg">
          <Link className="hover:text-gray-400 transition-colors" href={"/"}>
            Home
          </Link>
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
        <div className="ml-auto">
          <SigninButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
