import React from "react";
import Image, { StaticImageData } from "next/image";
import LoadingBall from "./Gif/LoadingBall.gif";
// import ClipLoader from "react-spinners/ClipLoader";
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <ClipLoader size={80} color="#000000 dark:#FFFFFF" /> */}
      <Image src={LoadingBall} height={120} width={120} alt={`Loading Ball`} />
      <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
        Loading ...
      </p>
    </div>
  );
}
