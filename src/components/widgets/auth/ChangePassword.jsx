import React, { useState } from "react";
import { useUser } from "@/contextApi/UserContext"; // Ensure this context is client-safe
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle visibility for password fields
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (user?.password === formData.oldPassword) {
      setUser((prevUser) => ({
        ...prevUser,
        password: formData.newPassword,
      }));
      toast.success("Password updated successfully!");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error("Current password is incorrect.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 mb-6 w-[95%]">
          <div className="grid grid-cols-3 gap-4">
            {/* Old Password Field */}
            <div className="flex flex-col">
              <TextField
                value={formData.oldPassword}
                name="oldPassword"
                label="Current Password"
                type={showPassword.oldPassword ? "text" : "password"}
                onChange={handleForm}
                fullWidth
                className="mb-4"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("oldPassword")}
                      >
                        {showPassword.oldPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* New Password Field */}
            <div className="flex flex-col">
              <TextField
                value={formData.newPassword}
                name="newPassword"
                label="New Password"
                type={showPassword.newPassword ? "text" : "password"}
                onChange={handleForm}
                fullWidth
                className="mb-4"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("newPassword")}
                      >
                        {showPassword.newPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <TextField
                value={formData.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword.confirmPassword ? "text" : "password"}
                onChange={handleForm}
                fullWidth
                className="mb-4"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
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
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
