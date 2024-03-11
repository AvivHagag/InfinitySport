import React from "react";
import Image from "next/image";
import LogoWhite from "../../Logos/LogoWhite.png";

export default function Aboutus() {
  const teamMembers = [
    {
      name: "Aviv Hagag",
      role: "Founder",
      avatarPath: LogoWhite,
    },
    {
      name: "Daniel Arvili",
      role: "ultra jewish",
      avatarPath: LogoWhite,
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-naivyBlue dark:text-glowGreen font-semibold tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Leading To Infinty
          </p>
          <p className="mt-4 max-w-2xl text-xl text-naivyBlue dark:text-glowGreen lg:mx-auto">
            Infinity Sport is a leading online retail destination that caters to
            the evolving needs of fitness enthusiasts and home workout
            aficionados. Specializing in providing top-quality home fitness
            equipment and sport facilities, Infinity Sport is committed to
            bringing the gym experience to the comfort of your own space. Our
            curated selection includes a diverse range of products, from
            state-of-the-art workout machines to premium sport facilities,
            ensuring that our customers have access to the latest and most
            effective tools for their fitness journey. At Infinity Sport, we
            prioritize excellence in both product quality and customer
            satisfaction, aiming to inspire individuals to achieve their health
            and wellness goals conveniently. Whether you're a seasoned athlete
            or just starting your fitness journey, Infinity Sport is your go-to
            destination for superior home fitness solutions. Embrace a healthier
            lifestyle with Infinity Sport, where your fitness knows no limits.
          </p>
        </div>

        <div className="mt-10">
          <Image
            src={LogoWhite}
            alt="logo of the company"
            className="mx-auto rounded-lg shadow-lg"
            width={140}
            height={140}
          />
          <p className="mt-4 text-lg text-gray-500"></p>
        </div>

        <div className="mt-20">
          <div className="lg:text-center">
            <h2 className="text-base text-naivySky font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A brief introduction to the team.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center mx-4">
                <Image
                  src={member.avatarPath}
                  alt={member.name}
                  className="rounded-full"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-lg font-bold">{member.name}</p>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
