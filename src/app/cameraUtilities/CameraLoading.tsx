"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ResDiamondLarge from "../assets/ui/ResDiamond-large.png";
import ResDiamondSmall from "../assets/ui/ResDiamond-small.png";
import ResDiamondMedium from "../assets/ui/ResDiamond-medium.png";
import cameraIcon from "../assets/ui/camera-icon.png";

const CameraLoading = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/capturePage");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] overflow-auto">
      <div className="flex-0 flex flex-col md:flex-row items-center justify-center relative">
        <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />

        <Image
          src={ResDiamondLarge}
          alt="Diamond Large"
          width={482}
          height={482}
          className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow"
        />
        <Image
          src={ResDiamondMedium}
          alt="DiamondMedium"
          width={444.34}
          height={444.34}
          className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower"
        />
        <Image
          src={ResDiamondSmall}
          alt="DiamondSmall"
          width={405.18}
          height={405.18}
          className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
          <Image
            src={cameraIcon}
            alt="Camera Icon"
            width={136}
            height={136}
            className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] animate-pulse-grow"
          />
          <p className="absolute font-semibold text-sm md:text-base leading-[24px] tracking-tight translate-y-22 animate-pulse">
            SETTING UP CAMERA ...
          </p>
        </div>
      </div>

      <div className="mt-0 text-center">
        <p className="text-xs md:text-sm mb-4 leading-6">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className="flex justify-center space-x-8">
          <p className="text-xs md:text-sm leading-6">◇ NEUTRAL EXPRESSION</p>
          <p className="text-xs md:text-sm leading-6">◇ FRONTAL POSE</p>
          <p className="text-xs md:text-sm leading-6">◇ ADEQUATE LIGHTING</p>
        </div>
      </div>
    </div>
  );
};

export default CameraLoading;
