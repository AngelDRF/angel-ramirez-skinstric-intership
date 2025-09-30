"use client";

import { useEffect, useState } from "react";
import HomePageAnimations from "./HomePageAnimations";

type ElementRefs = {
  mainHeadingRef: { current: HTMLDivElement | null };
  discoverButtonRef: { current: HTMLButtonElement | null };
  takeTestButtonRef: { current: HTMLButtonElement | null };
  leftSectionRef: { current: HTMLDivElement | null };
  rightSectionRef: { current: HTMLDivElement | null };
};

const ClientAnimationWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [refs, setRefs] = useState<ElementRefs>({
    mainHeadingRef: { current: null },
    discoverButtonRef: { current: null },
    takeTestButtonRef: { current: null },
    leftSectionRef: { current: null },
    rightSectionRef: { current: null },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      const mainHeading = document.getElementById(
        "main-heading"
      ) as HTMLDivElement | null;
      const discoverButton = document.getElementById(
        "discover-button"
      ) as HTMLButtonElement | null;
      const takeTestButton = document.getElementById(
        "take-test-button"
      ) as HTMLButtonElement | null;
      const leftSection = document.getElementById(
        "left-section"
      ) as HTMLDivElement | null;
      const rightSection = document.getElementById(
        "right-section"
      ) as HTMLDivElement | null;

      if (
        mainHeading &&
        discoverButton &&
        takeTestButton &&
        leftSection &&
        rightSection
      ) {
        setRefs({
          mainHeadingRef: { current: mainHeading },
          discoverButtonRef: { current: discoverButton },
          takeTestButtonRef: { current: takeTestButton },
          leftSectionRef: { current: leftSection },
          rightSectionRef: { current: rightSection },
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMounted]);

  if (!isMounted || !refs.mainHeadingRef.current) {
    return null;
  }

  return (
    <HomePageAnimations
      mainHeadingRef={refs.mainHeadingRef}
      discoverButtonRef={refs.discoverButtonRef}
      takeTestButtonRef={refs.takeTestButtonRef}
      leftSectionRef={refs.leftSectionRef}
      rightSectionRef={refs.rightSectionRef}
    />
  );
};

export default ClientAnimationWrapper;
