"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const TopLine = () => {
  const router = useRouter();
  const [lineStyle, setLineStyle] = useState("w-1/2");

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setLineStyle("w-1/2");
        break;
      case "/order":
        setLineStyle("w-full");
        break;
      default:
        setLineStyle("w-1/3");
        break;
    }
  }, [router.pathname]);

  return (
    <div
      className={`h-1 bg-orange-500 transition-width duration-500 ease-in-out ${lineStyle}`}
    ></div>
  );
};

export default TopLine;
