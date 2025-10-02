"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackBtnWhite from "../components/UI/BackBtnW";
import Image from "next/image";
import TakePictureIcon from "../assets/ui/takePictureIcon.png";
import LoadingDots from "../components/UI/LoadingDots";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    setError(null);

    try {
      console.log("Requesting camera access...");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      console.log("Camera access granted");
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(`Camera access error: ${err}`);
      setTimeout(() => router.push("/resultPage"), 3000);
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;

      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .then(() => {
              setIsVideoReady(true);
            })
            .catch((err) => {
              console.error("Error starting video playback:", err);
              setError(`Video playback error: ${err}`);
            });
        }
      };

      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
      };
    }
  }, [stream]);

  const capturePhoto = () => {
    setError(null);

    if (!videoRef.current || !canvasRef.current) {
      setError("Photo or canvas reference not available");
      return;
    }

    if (!isVideoReady) {
      setError("Photo is not ready yet, please wait a moment");
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video.videoWidth || !video.videoHeight) {
        console.error("Photo dimensions not available");
        setError("Cannot capture: photo dimensions not available");
        return;
      }

      console.log(
        `Capturing from video: ${video.videoWidth}x${video.videoHeight}`
      );

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        setError("Could not get canvas context");
        return;
      }

      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);

      setCapturedImage(imageDataUrl);

      stopCameraStream();
    } catch (error) {
      console.error("Error capturing photo:", error);
      setError(`Capture error: ${error}`);
    }
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
      setIsVideoReady(false);
    }
  };

  const resetCamera = async () => {
    setCapturedImage(null);
    setError(null);
    setIsVideoReady(false);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
    } catch (err) {
      console.error("Error restarting camera:", err);
      setError(`Camera restart error: ${err}`);
    }
  };

  const uploadImageToAPI = async () => {
    if (!capturedImage) {
      setError("No image captured");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      try {
        localStorage.setItem("uploadedImage", capturedImage);
        console.log("Image stored in localStorage");
      } catch (error) {
        console.warn("Failed to store in localStorage:", error);
      }

      const base64Data = capturedImage.split(",")[1];

      console.log("Sending API request...");
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Data }),
        }
      );

      console.log(`API response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      if (
        data.success === true &&
        data.message &&
        data.message.includes("success")
      ) {
        localStorage.setItem("demographicData", JSON.stringify(data.data));

        router.push("/selectPage");
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(`API error: ${error}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  return (
    <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p>{error}</p>
        </div>
      )}

      {stream && !isVideoReady && !capturedImage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-gray-100 border border-blue-400 text-blue-700 px-4 py-3 rounded max-w-md">
          <p>Initializing camera, please wait...</p>
        </div>
      )}

      {stream && !capturedImage && (
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {isVideoReady && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
              <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block">
                TAKE PICTURE
              </div>
              <div className="transform hover:scale-105 ease-in-out duration-300">
                <Image
                  src={TakePictureIcon}
                  alt="Take Picture"
                  width={60}
                  height={60}
                  onClick={capturePhoto}
                  className="w-16 h-16 cursor-pointer"
                />
              </div>
            </div>
          )}

          <div className="absolute bottom-30 sm:bottom-40 left-0 right-0 text-center z-20">
            <p className="text-sm mb-2 font-normal leading-6 text-[#FCFCFC]">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]">
              <p>◇ NEUTRAL EXPRESSION</p>
              <p>◇ FRONTAL POSE</p>
              <p>◇ ADEQUATE LIGHTING</p>
            </div>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="absolute inset-0 z-10 flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured selfie"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute text-sm leading-6 uppercase text-[#FCFCFC] top-40">
            Good Shot!
          </div>

          <div className="absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20">
            <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md">
              Preview
            </h2>
            <div className="flex justify-center space-x-6">
              <button
                className="px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
                onClick={resetCamera}
              >
                Retake
              </button>
              <button
                className="px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm"
                onClick={uploadImageToAPI}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Use This Photo"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
        <Link href="/resultPage">
          <BackBtnWhite />
        </Link>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#FCFCFC]  opacity-50 p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl animate-pulse">ANALYZING IMAGE...</p>
            <LoadingDots />
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
