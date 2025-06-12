"use client";
import React, { useState } from "react";
import Head from "next/head";
import { TextField, Button, IconButton, CircularProgress } from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "@/assets/image/logo.png";
import { callPublicApi } from "@/libs/callApis";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading spinner
    // Basic validation
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      return;
    }
    try {
      const res = await callPublicApi("/auth/login", "POST", loginForm);

      if (res.status === "error") {
        toast.error(res.message || "Login failed");
      } else {
        toast.success(res.message || "Login successfully");

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.dispatchEvent(new Event("tokenChanged"));

        setTimeout(() => {
          router.push("/");
        }, 100); // Reset form
        setLoginForm({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center  bg-gray-100  p-7 shadow-md rounded-md">
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
