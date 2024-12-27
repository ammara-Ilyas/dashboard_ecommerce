"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "../header/Navbar";
import Sidebar from "../header/Sidebar";

const PathnameWrapper = ({ children }) => {
  const pathname = usePathname();

  const hideLayoutRoutes = ["/auth/login", "/auth/register"];

  const showLayout = !hideLayoutRoutes.includes(pathname);

  return (
    <div>
      {showLayout && <Navbar />}
      {showLayout && <Sidebar />}
      <main>{children}</main>
    </div>
  );
};

export default PathnameWrapper;
