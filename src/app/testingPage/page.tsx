"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import DiamondLarge from "../assets/ui/Diamond-light-large.png";
import DiamondMedium from "../assets/ui/Diamond-medium-medium.png";
import DiamondSmall from "../assets/ui/Diamond-dark-small.png";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import BackBtn from "../components/UI/BackBtn";
import AnimatedProcessBtn from "../components/UI/AnimatedProcessBtn";
import LoadingDots from "../components/UI/LoadingDots";

type State = {
  errors?: {
    name?: string[];
    location?: string[];
  };
  message?: string;
  success?: string | boolean;
  step?: number;
  name?: string;
  location?: string;
};

async function submitForm(
  prevState: State,
  formData: FormData
): Promise<State> {
  const step = prevState.step || 1;

  if (step === 1) {
    const name = formData.get("name") as string;

    if (!name || name.trim() === "") {
      return {
        ...prevState,
        step: 1,
        errors: {
          name: ["Please enter your name"],
        },
      };
    }

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(name)) {
      return {
        ...prevState,
        step: 1,
        errors: {
          name: [
            "Please enter a valid name without numbers or special characters",
          ],
        },
      };
    }

    return {
      step: 2,
      name: name.trim(),
      errors: {},
    };
  }

  if (step === 2) {
    const location = formData.get("location") as string;
    const name = prevState.name || "";

    const isApiCall = formData.get("apiCall") === "true";

    if (isApiCall) {
      try {
        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              location: prevState.location,
            }),
          }
        );

        const result = await response.json();
        console.log("Full API Response:", result);

        if (result.success) {
          console.log("Success Message:", result.message);
          console.log(`SUCCESS: Added ${name} from ${prevState.location}`);
          return {
            step: 3,
            name,
            location: prevState.location,
            success: `SUCCESS: Added ${name} from ${prevState.location}`,
            message: result.message,
          };
        } else {
          console.error("API Error:", result);
          return {
            ...prevState,
            step: 2,
            errors: {
              location: [
                "There was a problem with your submission. Please try again.",
              ],
            },
          };
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        return {
          ...prevState,
          step: 2,
          errors: {
            location: [
              "There was a problem with your submission. Please try again.",
            ],
          },
        };
      }
    }

    if (!location || location.trim() === "") {
      return {
        ...prevState,
        step: 2,
        errors: {
          location: ["Please enter your city"],
        },
      };
    }

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(location)) {
      return {
        ...prevState,
        step: 2,
        errors: {
          location: [
            "Please enter a valid city without numbers or special characters",
          ],
        },
      };
    }

    return {
      ...prevState,
      step: 2,
      location: location.trim(),
    };
  }

  return prevState;
}

function FormInput({ error }: { error?: string[] }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col items-center">
      {error &&
        error.map((err, index) => (
          <p key={index} className="text-red-500 text-sm mb-2">
            {err}
          </p>
        ))}
    </div>
  );
}

export default function Page() {
  const [state, formAction] = useActionState(submitForm, {
    step: 1,
    errors: {},
  });

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleApiCall = React.useCallback(() => {
    if (state.step === 2 && !loading && state.location) {
      setLoading(true);

      setTimeout(() => {
        startTransition(() => {
          const apiFormData = new FormData();
          apiFormData.append("apiCall", "true");
          formAction(apiFormData);
          setLoading(false);
        });
      }, 1500);
    }
  }, [state.step, state.location, loading, formAction]);

  React.useEffect(() => {
    if (state.step === 2 && state.location && !loading && !isPending) {
      handleApiCall();
    }
  }, [state.step, state.location, loading, isPending, handleApiCall]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>

      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        {state.step !== 3 && !loading && (
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            CLICK TO TYPE
          </p>
        )}

        {loading && (
          <div className="relative z-10">
            <p className="text-lg text-gray-500 mb-2">Processing submission</p>
            <LoadingDots />
          </div>
        )}

        {state.step === 1 && !loading && (
          <form action={formAction} className="relative z-10">
            <FormInput error={state.errors?.name} />
            <input
              name="name"
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="Introduce Yourself"
              type="text"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        )}

        {state.step === 2 && !loading && !state.location && (
          <form action={formAction} className="relative z-10">
            <FormInput error={state.errors?.location} />
            <input
              name="location"
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[400px] sm:w-[460px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="your city name"
              type="text"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        )}

        {state.step === 3 && (
          <div className="flex flex-col items-center gap-4 z-10">
            <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">
              Thank you!
            </p>
            <p className="text-lg text-gray-600">Proceed for the next step</p>
          </div>
        )}

        <Image
          src={DiamondLarge}
          alt="Diamond Large"
          width={762}
          height={762}
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-190"
        />
        <Image
          src={DiamondMedium}
          alt="Diamond Medium"
          width={682}
          height={682}
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-185"
        />
        <Image
          src={DiamondSmall}
          alt="Diamond Small"
          width={602}
          height={602}
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest"
        />
      </div>

      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link className="inset-0" aria-label="Back" href="/">
          <BackBtn />
        </Link>

        {state.step === 3 && (
          <Link href="/result" className="inline-block">
            <AnimatedProcessBtn show={state.step === 3} />
          </Link>
        )}
      </div>
    </div>
  );
}
