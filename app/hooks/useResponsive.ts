"use client";

import { useState, useEffect } from "react";

const useResponsive = () => {
  const [clinicsPerSlide, setClinicsPerSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setClinicsPerSlide(3);
      } else if (window.innerWidth >= 768) {
        setClinicsPerSlide(2);
      } else {
        setClinicsPerSlide(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return clinicsPerSlide;
};

export default useResponsive;
