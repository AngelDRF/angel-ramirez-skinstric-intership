import Link from "next/link";
import React from "react";
import BackBtn from "../components/UI/BackBtn";
import HomeBtn from "../components/UI/HomeBtn";
import ClientSummary from "../utilities/ClientSummary";
import DemographicData from "../components/DemographicData";

const Page = async () => {
  return (
    <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
      <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
        <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
          <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I. ANALYSIS
            </h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">
              PREDICTED RACE &amp; AGE
            </h4>
          </div>

          <DemographicData>
            <ClientSummary />
          </DemographicData>

          <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
            <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
              <Link href="/selectPage">
                <BackBtn />
              </Link>
              <Link href="/">
                <HomeBtn />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
