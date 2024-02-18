"use client";
import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import LogoBlack from "../../Logos/LogoBlack.png";
import LogoWhite from "../../Logos/LogoWhite.png";

export default function LogoChoose() {
  const { theme } = useTheme();
  return (
    <>
      {" "}
      {theme === "dark" ? (
        <Link href={"/"}>
          <Image
            src={LogoWhite}
            alt={"logo"}
            className="rounded-full"
            width={100}
            height={100}
          />
        </Link>
      ) : (
        <Link href={"/"}>
          <Image
            src={LogoBlack}
            alt={"logo"}
            className="rounded-full"
            width={100}
            height={100}
          />
        </Link>
      )}
    </>
  );
}
