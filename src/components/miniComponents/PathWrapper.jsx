"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../header/Navbar";
import Sidebar from "../header/Sidebar";
// import { getToken } from "@/libs/Token";
const getToken = () => {
  // For example, from localStorage:
  return localStorage.getItem("token");
};
const PathnameWrapper = ({ children }) => {
  const [showLayout, setShowLayout] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [token, setToken] = useState(undefined);
  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  console.log("token in pathwrapper", token);

  const checkAccess = () => {
    // if (token === undefined) return;

    const isAuthPage =
      pathname === "/auth/login" ||
      pathname === "/auth/register" ||
      pathname === "/auth/otp";

    if (!token && !isAuthPage) {
      router.push("/auth/login");
    }

    setShowLayout(!!token && !isAuthPage);
  };

  useEffect(() => {
    checkAccess();
  }, [pathname, token, router]);

  // Listen for custom event
  useEffect(() => {
    const handleTokenChange = () => {
      const updatedToken = getToken();
      setToken(updatedToken);
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
