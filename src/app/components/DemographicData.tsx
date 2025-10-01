"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface DemographicOption {
  name: string;
  confidence: number;
}

interface CategoryData {
  prediction: string;
  confidence: number;
  options: DemographicOption[];
}

export interface DemographicData {
  race: CategoryData;
  age: CategoryData;
  sex: CategoryData;
}

const DemographicDataContext = createContext<{
  data: DemographicData | null;
  isLoading: boolean;
}>({
  data: null,
  isLoading: true,
});

const transformApiData = (apiData: any): DemographicData => {
  const raceOptions: DemographicOption[] = Object.entries(apiData.race).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
      confidence: Math.floor(Number(value) * 100),
    })
  );

  raceOptions.sort((a, b) => b.confidence - a.confidence);

  const ageOptions: DemographicOption[] = Object.entries(apiData.age).map(
    ([key, value]) => ({
      name: key,
      confidence: Math.floor(Number(value) * 100),
    })
  );

  ageOptions.sort((a, b) => b.confidence - a.confidence);

  const sexOptions: DemographicOption[] = Object.entries(apiData.gender).map(
    ([key, value]) => ({
      name: key.toUpperCase(),
      confidence: Math.floor(Number(value) * 100),
    })
  );

  sexOptions.sort((a, b) => b.confidence - a.confidence);

  return {
    race: {
      prediction: raceOptions[0].name,
      confidence: raceOptions[0].confidence,
      options: raceOptions,
    },
    age: {
      prediction: ageOptions[0].name,
      confidence: ageOptions[0].confidence,
      options: ageOptions,
    },
    sex: {
      prediction: sexOptions[0].name,
      confidence: sexOptions[0].confidence,
      options: sexOptions,
    },
  };
};

interface DemographicDataProviderProps {
  children: ReactNode;
}

const DemographicData: React.FC<DemographicDataProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<DemographicData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDemographicData = () => {
      try {
        const storedData = localStorage.getItem("demographicData");

        if (storedData) {
          const apiData = JSON.parse(storedData);

          const transformedData = transformApiData(apiData);

          setData(transformedData);
        } else {
          console.log("No demographic data found");
        }
      } catch (error) {
        console.error("Error retrieving demographic data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemographicData();
  }, [router]);

  return (
    <DemographicDataContext.Provider value={{ data, isLoading }}>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-2xl">Loading analysis data...</div>
        </div>
      ) : data ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl mb-4">
            No analysis data found. Please upload an image first.
          </p>
          <button
            onClick={() => router.push("/resultPage")}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Go to Upload Page or take a Picture with your device
          </button>
        </div>
      )}
    </DemographicDataContext.Provider>
  );
};

export const useDemographicData = () => {
  const context = useContext(DemographicDataContext);
  if (context === undefined) {
    throw new Error("useDemographicData must be used within a DemographicData");
  }
  return context;
};

export default DemographicData;
