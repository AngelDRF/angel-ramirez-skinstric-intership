"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ProcessBtn from "./ProcessBtn";

interface AnimatedProcessBtnProps {
  show: boolean;
}

const AnimatedProcessBtn: React.FC<AnimatedProcessBtnProps> = ({ show }) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!show || !btnRef.current) return;

    if (animated.current) return;
    animated.current = true;

    gsap.set(btnRef.current, {
      y: "-10%",
      x: "-200%",
      opacity: 0,
      visibility: "visible",
    });

    const tl = gsap.timeline();

    tl.to(btnRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
    });

    tl.to(btnRef.current, {
      y: "0%",
      duration: 1,
      ease: "elastic.out(1,0.3)",
    });
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={btnRef}
      className="invisible"
      style={{
        position: "relative",
      }}
    >
      <ProcessBtn />
    </div>
  );
};

export default AnimatedProcessBtn;
