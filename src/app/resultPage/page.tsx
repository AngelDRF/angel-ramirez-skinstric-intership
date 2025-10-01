import Link from "next/link";
import ResDiamondLarge from "../assets/ui/ResDiamond-large.png";
import ResDiamondSmall from "../assets/ui/ResDiamond-small.png";
import ResDiamondMedium from "../assets/ui/ResDiamond-medium.png";
import cameraIcon from "../assets/ui/camera-icon.png";
import ResScanLine from "../assets/ui/ResScanLine.png";
import galleryIcon from "../assets/ui/gallery-icon.png";
import ResGalleryLine from "../assets/ui/ResGalleryLine.png";
import BackBtn from "../components/UI/BackBtn";
import ClientComponent from "../components/ClientComponent";
import ProcessBtn from "../components/UI/ProcessBtn";
import CameraClientSection from "../cameraUtilities/CameraClientSection";
import ResultClient from "../components/ResultClient";

const Page = () => {
  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>

      <ResultClient>
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
          <CameraClientSection
            cameraIcon={cameraIcon}
            ResScanLine={ResScanLine}
            ResDiamondLarge={ResDiamondLarge}
            ResDiamondMedium={ResDiamondMedium}
            ResDiamondSmall={ResDiamondSmall}
          />

          <ClientComponent
            galleryIcon={galleryIcon}
            ResDiamondLarge={ResDiamondLarge}
            ResDiamondMedium={ResDiamondMedium}
            ResDiamondSmall={ResDiamondSmall}
            ResGalleryLine={ResGalleryLine}
          />
        </div>
      </ResultClient>

      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
          <Link className="relative" aria-label="Back" href="/testingPage">
            <BackBtn />
          </Link>

          <Link href="/selectPage">
            <div className="hidden">
              <ProcessBtn />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
