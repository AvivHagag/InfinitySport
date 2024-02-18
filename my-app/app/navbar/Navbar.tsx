import React from "react";
import Link from "next/link";
import SigninButton from "./SignInButton";
import LogoChoose from "./LogoChoose";

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
        <div className="">
          <SigninButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
