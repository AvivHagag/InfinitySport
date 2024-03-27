"use client";
import React from "react";
import Image from "next/image";
import weights from "./weights.png";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function AdsComponent() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="flex justify-between px-8 relative">
          <div>
            <Fade delay={700}>
              <div className="text-4xl sm:text-7xl lg:text-8xl whitespace-nowrap font-semibold bg-clip-text text-transparent bg-gradient-to-b from-naivyBlue dark:from-gray-200 via-gray-400 dark:via-gray-400 to-gray-200 dark:to-gray-800 transform translate-x-16 sm:translate-x-16 lg:translate-x-20">
                All Weights
              </div>
            </Fade>
            <Slide delay={1200}>
              <div className="text-3xl sm:text-5xl lg:text-7xl text-naivySky dark:text-gray-400 font-medium whitespace-nowrap -mt-2 sm:-mt-4">
                50% Off
              </div>
            </Slide>
            <div className="flex flex-col space-y-2">
              <Fade delay={1600}>
                <Slide cascade delay={1600}>
                  <div className="text-xs sm:text-base lg:text-xl font-medium">
                    Overview
                  </div>
                </Slide>
              </Fade>
              <Fade delay={1700}>
                <Slide cascade delay={1700}>
                  <div className="text-xs sm:text-base lg:text-lg text-naivyBlue dark:text-glowGreen w-32 sm:w-64 lg:w-80">
                    Unleash your home gym's potential with All Weights! <br />
                    Seize our 50% off deal now and bring your fitness goals to
                    life. <br />
                  </div>
                  <div className="text-xs sm:text-base lg:text-lg text-naivyBlue dark:text-glowGreen whitespace-nowrap sm:w-64 lg:w-80">
                    Shop the dream, shape the future
                  </div>
                </Slide>
              </Fade>
            </div>
          </div>
          <div className="flex overflow-visible my-4 sm:my-0">
            <Slide direction="right">
              <Image
                src={weights}
                className="transform xxs:translate-y-12 xxs:-translate-x-4 xxs:scale-150 translate-y-2 translate-x-4 sm:-translate-x-24 md:translate-y-2 lg:-translate-x-1/3 xs:scale-100 dark:brightness-75"
                width={450}
                height={450}
                alt="Floating Promo"
              />
            </Slide>
          </div>
        </div>
        <Fade delay={1900}>
          <Slide direction="up" delay={1900}>
            <div className="flex justify-center my-16 sm:my-12">
              <Button
                variant={"outline"}
                className="text-xl font-medium border-naivyBlue dark:border-glowGreen flex flex-row items-center border px-2 rounded-lg hover:scale-105 hover:dark:bg-slate-950"
              >
                <Link href={"/dumbbells&bars"} className="flex items-center">
                  Shop The Dream
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/ios/100/dumbbell--v1.png"
                    alt="dumbbell--v1"
                    className="ml-2 dark:invert"
                  />
                </Link>
              </Button>
            </div>
          </Slide>
        </Fade>
      </div>
    </div>
    // <div className="hidden md:flex flex-col ml-44 justify-center xl:ml-28 items-center">
    //   <div className="relative">
    //     <Slide direction="right">
    //       <Image
    //         src={weights}
    //         alt={"weights"}
    //         width={450}
    //         height={450}
    //         className="xl:-mt-10 dark:brightness-75"
    //       />
    //     </Slide>
    //     <Fade delay={700}>
    //       <div className="absolute top-0 -left-48">
    //         <div className="text-8xl whitespace-nowrap font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-700 via-gray-400 to-gray-200">
    //           All Weights
    //         </div>
    //       </div>
    //     </Fade>
    //     <Fade delay={1200}>
    //       <div className="absolute top-20 -left-60">
    //         <Slide delay={1200}>
    //           <div className="text-7xl text-gray-600 font-medium whitespace-nowrap">
    //             50% Off
    //           </div>
    //         </Slide>
    //       </div>
    //     </Fade>
    //     <div className="absolute top-40 -left-60 w-60">
    //       <div className="flex flex-col space-y-4">
    //         <Fade delay={1600}>
    //           <Slide cascade delay={1600}>
    //             <div className="text-xl font-medium">Overview</div>
    //           </Slide>
    //         </Fade>
    //         <Fade delay={1700}>
    //           <Slide cascade delay={1700}>
    //             <div className="text-lg text-naivyBlue dark:text-glowGreen">
    //               Unleash your home gym's potential with All Weights! <br />
    //               Seize our 50% off deal now and bring your fitness goals to
    //               life. <br />
    //               Shop the dream, shape the future
    //             </div>
    //           </Slide>
    //         </Fade>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div className="my-16 mr-[30rem]">
    //       <Link href={"/dumbbells&bars"}>
    //         <Zoom delay={1800}>
    //           <Slide direction="down" delay={18000}>
    //             <div className="text-xl font-medium border-naivyBlue dark:border-glowGreen flex flex-row items-center border border-2 border-current px-2 rounded-lg hover:scale-105 z-10">
    //               Shop The Dream !
    //               <img
    //                 width="40"
    //                 height="40"
    //                 src="https://img.icons8.com/ios/100/dumbbell--v1.png"
    //                 alt="dumbbell--v1"
    //                 className="ml-2 dark:invert"
    //               />
    //             </div>
    //           </Slide>
    //         </Zoom>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
