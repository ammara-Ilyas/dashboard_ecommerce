"use client";
import React, { useState } from "react";
import Head from "next/head";
import { TextField, Button, IconButton } from "@mui/material";
import { Google } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "/public/image/logo.png";
import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      setError("Please fill out all required fields.");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    // Mock submission
    console.log("Signup Form Data:", signupForm);
    toast.success("Sign successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: isDarkMode ? "dark" : "light",
    });
    // Reset form (optional)
    setSignupForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Ecommerce Dashboard</title>
        <meta name="description" content="Ecommerce Dashboard & Admin Panel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-11/12 lg:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-blue-50 p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            BEST UX/UI FASHION
          </h1>
          <h2 className="text-4xl font-extrabold text-blue-700">
            ECOMMERCE DASHBOARD
          </h2>
          <p className="text-gray-600 text-center mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.
          </p>
          <Button variant="contained" color="primary" className="mt-6" href="#">
            Go To Home
          </Button>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
          <img src={logo} alt="Ecommerce Logo" className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">ECOMMERCE</h2>

          <form
            className="w-full max-w-sm mt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Enter your Name"
              name="name"
              value={signupForm.name}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Enter your Email"
              name="email"
              value={signupForm.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Enter your Phone"
              name="phone"
              value={signupForm.phone}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Enter your Password"
              name="password"
              type="password"
              value={signupForm.password}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm your Password"
              name="confirmPassword"
              type="password"
              value={signupForm.confirmPassword}
              onChange={handleChange}
              variant="outlined"
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-4 text-gray-500 text-center">or</div>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<Google />}
            className="mt-4"
          >
            Sign In With Google
          </Button>

          <div className="mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/auth/login" className="text-blue-600 underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
