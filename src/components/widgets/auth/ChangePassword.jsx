import React, { useState, useContext } from "react";
import { useUser } from "@/contextApi/UserContext"; // Ensure this context is client-safe
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ChangePassword = () => {
  // Fix: Ensure context is client-safe
  const { user, setUser } = useUser(); // Avoid calling useContext inside the argument of useUser
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle form field changes
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Validation
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Simulate password update
    if (user?.password === formData.oldPassword) {
      setUser((prevUser) => ({
        ...prevUser,
        password: formData.newPassword,
      }));
      alert("Password updated successfully!");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setError("Current password is incorrect.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields Section */}
      <div className="bg-white p-6 mb-6  w-[95%]">
        <div className="grid grid-cols-3 gap-4">
          {/* OLD Password Field */}
          <div className="flex flex-col">
            <TextField
              value={formData.oldPassword}
              name="oldPassword"
              label="Current Password"
              type="password"
              onChange={handleForm}
              fullWidth
              className="mb-4"
            />
          </div>

          {/* New Password Field */}
          <div className="flex flex-col">
            <TextField
              value={formData.newPassword}
              name="newPassword"
              label="New Password"
              type="password"
              onChange={handleForm}
              fullWidth
              className="mb-4"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col">
            <TextField
              value={formData.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={handleForm}
              fullWidth
              className="mb-4"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className="bg-blue-600 w-[20%] hover:bg-blue-700 mt-4"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
