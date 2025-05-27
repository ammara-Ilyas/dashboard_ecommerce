"use client";
import React, { useRef, useState } from "react";
import Head from "next/head";
import { Button, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "@/assets/image/logo.png";
import { callPublicApi } from "@/libs/callApis";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useUser } from "@/contextApi/UserContext";
export default function OtpForm() {
  const { email, setEmail } = useUser();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await callPublicApi("/auth/resend-otp", "POST", {
        email: email,
      });
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.message || "Internal Server error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await callPublicApi("/auth/verify-otp", "POST", {
        email,
        otp: fullOtp,
      });

      toast.success(res.message || "OTP verified successfully.");
      setOtp(["", "", "", "", "", ""]);

      setEmail("");
      router.push("/auth/login");
    } catch (error) {
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-7 shadow-md rounded-md">
      <Head>
        <title>Enter OTP</title>
        <meta name="description" content="OTP Verification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      <div className="flex flex-col w-11/12 md:w-1/3 p-8">
        <Image
          src={logo}
          alt="Ecommerce Logo"
          className="w-16 h-16 mx-auto mb-4"
          width={64}
          height={64}
        />
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Enter OTP
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verify OTP"
            )}
          </Button>
          <div
            className="text-blue-600 underline italic w-full cursor-pointer text-right pt-2 pr-5 font-medium"
            onClick={handleResendOtp}
          >
            <p>Resend Otp</p>
          </div>
        </form>
      </div>
    </div>
  );
}
