"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../header/Navbar";
import Sidebar from "../header/Sidebar";

const PathnameWrapper = ({ children }) => {
  const [showLayout, setShowLayout] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const token = localStorage.getItem("token");
  const checkAccess = () => {
    const isAuthPage =
      pathname === "/auth/login" || pathname === "/auth/register";

    if (!token && !isAuthPage) {
      router.push("/auth/login");
    }

    setShowLayout(!!token && !isAuthPage);
  };

  useEffect(() => {
    checkAccess();

    // Listen for custom event
    const handleTokenChange = () => {
      checkAccess();
    };

    window.addEventListener("tokenChanged", handleTokenChange);
    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
    };
  }, [pathname, token, router]);

  return (
    <div>
      {showLayout && <Navbar />}
      {showLayout && <Sidebar />}
      <main>{children}</main>
    </div>
  );
};

export default PathnameWrapper;
