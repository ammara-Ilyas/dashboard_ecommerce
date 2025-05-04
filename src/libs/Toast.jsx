import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ type = "success", message = "" }) => {
  useEffect(() => {
    if (message) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }
  }, [message, type]);

  return <ToastContainer />;
};

export default Toast;
