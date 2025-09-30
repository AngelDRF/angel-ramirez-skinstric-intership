"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HomePageAnimationsProps {
  mainHeadingRef: { current: HTMLDivElement | null };
  discoverButtonRef: { current: HTMLButtonElement | null };
  takeTestButtonRef: { current: HTMLButtonElement | null };
  leftSectionRef: { current: HTMLDivElement | null };
  rightSectionRef: { current: HTMLDivElement | null };
}

const HomePageAnimations: React.FC<HomePageAnimationsProps> = ({
  mainHeadingRef,
  discoverButtonRef,
  takeTestButtonRef,
  leftSectionRef,
  rightSectionRef,
}) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const mainHeading = mainHeadingRef.current;
    const discoverButton = discoverButtonRef.current;
    const takeTestButton = takeTestButtonRef.current;
    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    if (
      !mainHeading ||
      !discoverButton ||
      !takeTestButton ||
      !leftSection ||
      !rightSection
    ) {
      return;
    }

    initialized.current = true;

    const headingText = mainHeading.querySelector("h1");
    if (!headingText) return;

    const firstLineTextNode = headingText.childNodes[0];
    const secondLineElement = headingText.querySelector("span");

    if (!firstLineTextNode || !secondLineElement) return;

    gsap.set(headingText, { opacity: 0 });

    const timeline = gsap.timeline();

    timeline.to(headingText, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
    });

    if (takeTestButton && leftSection && mainHeading) {
      takeTestButton.addEventListener("mouseenter", () => {
        gsap.to(leftSection, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(headingText, {
          x: "-20rem",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
        });
        gsap.to(secondLineElement, {
          x: "-6rem",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
        });
      });

      takeTestButton.addEventListener("mouseleave", () => {
        gsap.to(leftSection, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(headingText, {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
        });
        gsap.to(secondLineElement, {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
      });
    }

    if (discoverButton && rightSection && mainHeading) {
      discoverButton.addEventListener("mouseenter", () => {
        gsap.to(rightSection, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(headingText, {
          x: "20rem",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
        });
        gsap.to(secondLineElement, {
          x: "6rem",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
      });

      discoverButton.addEventListener("mouseleave", () => {
        gsap.to(rightSection, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(headingText, {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
        gsap.to(secondLineElement, {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
      });
    }

    return () => {
      if (takeTestButton) {
        takeTestButton.removeEventListener("mouseenter", () => {});
        takeTestButton.removeEventListener("mouseleave", () => {});
      }
      if (discoverButton) {
        discoverButton.removeEventListener("mouseenter", () => {});
        discoverButton.removeEventListener("mouseleave", () => {});
      }
    };
  }, [
    mainHeadingRef,
    discoverButtonRef,
    takeTestButtonRef,
    leftSectionRef,
    rightSectionRef,
  ]);

  return null;
};

export default HomePageAnimations;
