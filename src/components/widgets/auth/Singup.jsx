"use client";
import React, { useState } from "react";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "@/assets/image/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Signup() {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
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
    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      toast.error("Please fill out all required fields.");

      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setError("");

    setLoading(true); // Start loading

    // Mock submission
    setTimeout(() => {
      console.log("Signup Form Data:", signupForm);
      toast.success("Sign up successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form (optional)
      setSignupForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setLoading(false); // Stop loading
      router.push("/auth/login");
    }, 2000); // Simulate API delay
  };

  return (
    <div className=" flex flex-col items-center  justify-center  ">
      <div className="flex  items-center shadow-lg rounded-lg overflow-hidden gap-4">
        {/* Left Side */}
        <div className=" w-[65%] mt-10 flex  flex-col   pr-0 pl-14">
          <p className="text-[44px] leading-[48px] font-extrabold   ">
            <span className=" text-black">BEST UX/UI FASHION </span>
            <span className=" text-blue-700">ECOMMERCE DASHBOARD </span>
            <span className="text-black">& ADMIN PANEL</span>
          </p>
          <p className="text-gray-600 mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries
          </p>
          <Button
            variant="contained"
            color="primary"
            className="mt-6 ml-6 w-[20%] font-semibold py-2"
            href="/"
            startIcon={<CloudUploadIcon />}
          >
            Go To Home
          </Button>
        </div>

        {/* Right Side */}
        <div className="w-[30%] shadow-md mr-2 rounded-md py-6 bg-gray-100 ml-auto pr-0 flex justify-center items-center flex-col  ">
          <Image
            src={logo}
            alt="Ecommerce Logo"
            className="w-16 h-16 my-6"
            width={16}
            heigt={16}
          />
          <h2 className="text-2xl font-semibold text-gray-800">ECOMMERCE</h2>

          <form
            className="w-[100%] flex flex-col justify-center  mt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Enter your Name"
              name="name"
              value={signupForm.name}
              onChange={handleChange}
              variant="outlined"
              className="bg-white w-[80%] mx-auto"
            />
            <TextField
              fullWidth
              label="Enter your Email"
              name="email"
              value={signupForm.email}
              onChange={handleChange}
              variant="outlined"
              className="bg-white w-[80%] mx-auto"
            />
            <TextField
              fullWidth
              label="Enter your Phone"
              name="phone"
              value={signupForm.phone}
              onChange={handleChange}
              variant="outlined"
              className="bg-white w-[80%] mx-auto"
            />
            <TextField
              fullWidth
              label="Enter your Password"
              name="password"
              type="password"
              value={signupForm.password}
              onChange={handleChange}
              variant="outlined"
              className="bg-white w-[80%] mx-auto"
            />
            <TextField
              fullWidth
              label="Confirm your Password"
              name="confirmPassword"
              type="password"
              value={signupForm.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              className="bg-white w-[80%] mx-auto"
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4 w-[40%] mx-auto font-medium py-2"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 text-gray-500 text-center">or</div>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<FcGoogle className="" />}
            className="mt-4 font-semibold py-2"
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
