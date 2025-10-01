"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModal } from "../utilities/Modal";
import LoadingDots from "./UI/LoadingDots";

interface ImageUploadProps {
  galleryIcon: any;
  ResDiamondLarge: any;
  ResDiamondMedium: any;
  ResDiamondSmall: any;
  ResGalleryLine: any;
}

const ClientComponent: React.FC<ImageUploadProps> = ({
  galleryIcon,
  ResDiamondLarge,
  ResDiamondMedium,
  ResDiamondSmall,
  ResGalleryLine,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const { isModalOpen } = useModal();
  const router = useRouter();

  const handleGalleryClick = () => {
    if (!isModalOpen) {
      fileInputRef.current?.click();
    }
  };

  const safelyStoreData = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to store ${key} in localStorage:`, error);
      return false;
    }
  };

  const resizeAndConvertImage = (
    file: File,
    maxWidth = 800,
    maxHeight = 800
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new (window.Image as any)();
        img.src = event.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          resolve(resizedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const stripBase64Prefix = (base64DataUrl: string): string => {
    return base64DataUrl.split(",")[1];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      setIsLoading(true);

      const resizedImage = await resizeAndConvertImage(file);

      safelyStoreData("uploadedImage", resizedImage);

      const base64String = stripBase64Prefix(resizedImage);
      await uploadImageToAPI(base64String);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process the image. Please try again.");
      setUploadSuccessful(false);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageToAPI = async (base64String: string) => {
    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64String }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API response:", data);

      if (
        data.success === true &&
        data.message &&
        data.message.includes("success")
      ) {
        safelyStoreData("demographicData", JSON.stringify(data.data));
        setUploadSuccessful(true);
        alert("Image analyzed successfully!");
        router.push("/selectPage");
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to analyze image. Please try again.");
      setUploadSuccessful(false);
    }
  };

  return (
    <>
      <div
        className={`relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 ${
          isModalOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />

        <Image
          src={ResDiamondLarge}
          alt="Diamond Large"
          className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
        />
        <Image
          src={ResDiamondMedium}
          alt="DiamondMedium"
          className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-195"
        />
        <Image
          src={ResDiamondSmall}
          alt="DiamondSmall"
          className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image
            src={galleryIcon}
            alt="Photo Upload Icon"
            className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
            onClick={handleGalleryClick}
            width={136}
            height={136}
          />
          <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
            <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </p>
            <Image
              src={ResGalleryLine}
              alt="Gallery Line"
              className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
              width={66.33}
              height={59.37}
            />
          </div>
        </div>
      </div>

      <div
        className={`absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 ${
          isModalOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
        <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          )}
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-11">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />

          <Image
            src={ResDiamondLarge}
            alt="Diamond Large"
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-load rotate-205"
          />
          <Image
            src={ResDiamondMedium}
            alt="DiamondMedium"
            className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-loader rotate-195"
          />
          <Image
            src={ResDiamondSmall}
            alt="DiamondSmall"
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-loadest"
          />
          <div className="absolute bg-white p-4 space-y-0">
            <p className="text-base font-semibold leading-6 tracking-tight">
              PREPARING YOUR ANALYSIS...
            </p>
            <div>
              <LoadingDots />
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ClientComponent;
