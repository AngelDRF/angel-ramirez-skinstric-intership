"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModal } from "../utilities/Modal";

interface CameraSectionProps {
  cameraIcon: any;
  ResScanLine: any;
  ResDiamondLarge: any;
  ResDiamondMedium: any;
  ResDiamondSmall: any;
}

const CameraClientSection: React.FC<CameraSectionProps> = ({
  cameraIcon,
  ResScanLine,
  ResDiamondLarge,
  ResDiamondMedium,
  ResDiamondSmall,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { setModalOpen } = useModal();
  const router = useRouter();

  const handleCameraClick = () => {
    setShowModal(true);
    setModalOpen(true);
  };

  const handleAllow = () => {
    setShowModal(false);
    setModalOpen(false);
    router.push("/cameraPage");
  };

  const handleDeny = () => {
    setShowModal(false);
    setModalOpen(false);
  };

  return (
    <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
      <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />

      <Image
        src={ResDiamondLarge}
        alt="Diamond Large"
        width={482}
        height={482}
        className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
      />
      <Image
        src={ResDiamondMedium}
        alt="DiamondMedium"
        width={444.34}
        height={444.34}
        className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-190"
      />
      <Image
        src={ResDiamondSmall}
        alt="DiamondSmall"
        width={405.18}
        height={405.18}
        className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          src={cameraIcon}
          alt="Camera Icon"
          className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
          width={136}
          height={136}
          onClick={handleCameraClick}
        />

        <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
          <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </p>
          <Image
            src={ResScanLine}
            alt="Scan Line"
            className="absolute hidden md:block md:right-[143px] md:top-[20px]"
            width={66}
            height={59}
          />
        </div>
      </div>

      {showModal && (
        <div className="absolute md:top-[43%] md:left-[360px] w-[352px] z-50">
          <div className="bg-[#1A1B1C] pt-4 pb-2">
            <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] pl-4">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>
            <div className="flex mt-4 border-t border-[#FCFCFC] pt-2">
              <button
                className="px-7 md:translate-x-45 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500"
                onClick={handleDeny}
              >
                DENY
              </button>
              <button
                className="px-5 md:translate-x-45 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300"
                onClick={handleAllow}
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraClientSection;
