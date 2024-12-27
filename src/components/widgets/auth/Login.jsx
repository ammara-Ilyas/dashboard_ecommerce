"use client";
import React, { useState } from "react";
import Head from "next/head";
import { TextField, Button, IconButton, CircularProgress } from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "/public/image/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaS } from "react-icons/fa6";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Start loading spinner
    // Basic validation
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      return;
    }
    // Simulate API response
    setTimeout(() => {
      if (
        loginForm.email === "user@example.com" &&
        loginForm.password === "password123"
      ) {
        const token = "mock-token-123"; // Simulated token from API
        localStorage.setItem("userToken", token); // Save token to localStorage
        toast.success("Login successful!");
        setLoading(false); // Stop loading spinner
        router.push("/");
      } else {
        toast.error("Invalid email or password!");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center  bg-gray-100  p-7 shadow-md rounded-md">
      <Head>
        <title>Ecommerce Login</title>
        <meta name="description" content="Ecommerce Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      <div className="flex flex-col w-11/12 md:w-1/3 p-8">
        <Image
          src={logo}
          alt="Ecommerce Logo"
          className="w-16 h-16 mx-auto mb-4"
          width={16}
          height={16}
        />
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          ECOMMERCE
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <TextField
            fullWidth
            label="Enter your Email"
            name="email"
            type="email"
            value={loginForm.email}
            onChange={handleChange}
            variant="outlined"
            className="bg-white"
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Enter your Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={loginForm.password}
            onChange={handleChange}
            variant="outlined"
            className="bg-white"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-2 text-center text-gray-500">or</div>

        {/* Google Sign-In */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FcGoogle />}
          fullWidth
          className="mt-4 py-2 font-semibold"
        >
          Sign In With Google
        </Button>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register">
            <span className="text-blue-600 underline cursor-pointer">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
