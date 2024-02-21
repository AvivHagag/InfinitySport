"use client";
import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import LogoBlack from "../../Logos/LogoBlack.png";
import LogoWhite from "../../Logos/LogoWhite.png";

export default function LogoChoose() {
  const { theme } = useTheme();
  if (theme) {
    return (
      <>
        <Link href={"/"}>
          {theme === "dark" ? (
            <Image
              src={LogoWhite}
              alt={"LogoWhite"}
              priority={true}
              width={90}
              height={90}
            />
          ) : (
            <Image
              src={LogoBlack}
              alt={"LogoBlack"}
              priority={true}
              width={100}
              height={100}
            />
          )}
        </Link>
      </>
    );
  }
}
